import { initAdmin } from "@/app/firebase/firebaseAdmin";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import WordExtractor from "word-extractor";
import { Buffer } from "buffer";
import officeParser from "officeparser";

export async function POST(req: NextRequest) {
  try {
    // Get the session cookie
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Initialize Firebase Admin
    const admin = await initAdmin();

    // Verify the token from the session cookie
    const decodedToken = await admin.auth().verifySessionCookie(sessionCookie.value, true);
    const uid = decodedToken.uid;

    // Parse the form data to get the file
    const formData = await req.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    // Convert Blob to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Determine the file type
    const fileType = file.type;
    let fileContent: string;

    try {
      switch (fileType) {
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          // Extract the content of the .docx file
          const wordExtractor = new WordExtractor();
          const extracted = await wordExtractor.extract(buffer);
          fileContent = extracted.getBody();
          break;

        case 'text/plain':
          // Extract the content of the .txt file
          const textDecoder = new TextDecoder();
          fileContent = textDecoder.decode(buffer);
          break;

        case 'application/pdf':
          // Extract the content of the .pdf file
          fileContent = await officeParser.parseOfficeAsync(buffer);

        case 'application/vnd.ms-powerpoint':
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
          // Extract the content of the .pptx file
          fileContent = await officeParser.parseOfficeAsync(buffer);
          break;

        default:
          return NextResponse.json({ error: 'Unsupported file type.' }, { status: 400 });
      }

      console.log(fileContent);
      

      return NextResponse.json({ text: fileContent });
    } catch (parseError) {
      console.error('Error parsing file:', parseError);
      return NextResponse.json({ error: 'Failed to parse file' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error processing file upload:', error);
    return NextResponse.json({ error: 'Failed to process file upload' }, { status: 500 });
  }
}
