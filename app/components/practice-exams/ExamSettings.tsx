'use client';

import { useCallback, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert, CircularProgress } from "@mui/material";
import { useChatList } from "@/app/hooks/useChatList";
import SlidesDropzone from "@/app/components/my-tutor/SlidesDropzone";
import { useRouter } from "next/navigation";

// Utility function to remove file extension
const removeFileExtension = (fileName: string): string => {
  return fileName.replace(/\.[^/.]+$/, "");
};

type FormValues = {
  slideId: string;
  examFormat: "mcq" | "theory";
  numberOfQuestions: number;
  difficulty: string
};

type ExamSettingsProps = {
  defaultValues: FormValues;
};

const ExamSettings = ({ defaultValues }: ExamSettingsProps) => {
  const { chatList, loading, error } = useChatList();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const router = useRouter();

  const examFormat = watch("examFormat");

  useEffect(() => {
    setValue("slideId", defaultValues.slideId);
  }, [defaultValues.slideId, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsRedirecting(true)
    console.log("Form data submitted:", data);
    router.push(`/practice-exam/${data.examFormat}/${data.slideId}?numberOfQuestions=${data.numberOfQuestions}&difficulty=${data.difficulty}`)
  };

  const uploadFile = async (file: File) => {
    setStatus('Extracting...');
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/extractText', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to extract text from file.');
      }

      const result = await response.json();

      // Create chapter with extracted text
      const fileNameWithoutExtension = removeFileExtension(file.name);
      await createChapter(result.text, fileNameWithoutExtension);
    } catch (error: any) {
      setStatus(null);
      console.error('Error extracting text:', error);
      setUploadError('Failed to extract text. Please try again.');
    }
  };

  const createChapter = async (description: string, name: string) => {
    setStatus('Uploading...');
    try {
      const response = await fetch('/api/createChapter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, name }),
      });

      const result = await response.json();

      if (!response.ok) {
        setUploadError(result.error);
        setStatus(null);
        return;
      }

      console.log(result);
      setSuccess(true);
      setUploadError(null);
      setStatus('Upload successful!');
      setValue("slideId", result.slide.slideId);
      handleDialogClose();
      setFile(null); // Clear the file after upload
    } catch (error: any) {
      setStatus(null);
      console.error('Error creating chapter:', error);
      setUploadError('Failed to create chapter. Please try again.');
    } finally {
      setStatus(null); // Reset the button status
    }
  };

  const handleUploadClick = async () => {
    setApiError(null);
    setUploadError(null);
    setSuccess(false);

    if (!file) {
      setUploadError("No file selected for upload.");
      return;
    } else {
      await uploadFile(file);
    }
  };

  const clearError = () => {
    setApiError(null);
    setUploadError(null);
  };

  const handleFileDrop = useCallback((acceptedFiles: File[]) => {
    clearError();
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const handleDialogClose = () => {
    setUploadError(null);
    setDialogOpen(false);
  };

  const handleDialogOpen = () => setDialogOpen(true);

  return (
    <div className="md:min-w-[400px]">
      <div className="flex items-center gap-10 justify-between">
        <h3 className="text-primary">
          Practice Exam Configuration
        </h3>
      </div>
      <p className="text-[14px] mt-3 max-w-[500px] text-primary">
        Set up your practice exam by selecting slides, choosing the format, and specifying the number of questions to match your study needs.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 mt-6">
        {error && <Alert severity="error">{error}</Alert>}
        <>
          <div className="grid grid-flow-row gap-1 min-w-0 text-[14px]">
            <label htmlFor="chat" className="text-primary">Select Slides</label>
            <div className="w-full grid grid-flow-col gap-2 grid-cols-[1fr,100px]">
              {
                loading
                  ? <div className="w-full h-[40px] bg-[var(--bg-card)] text-secondary animate-pulse min-w-0 rounded-[4px]"></div>
                  : <select
                    {...register("slideId", { required: "Chat selection is required" })}
                    className="px-5 py-2 border-[var(--bg-card)] text-secondary border min-w-0 rounded-[4px]"
                    id="chat"
                    defaultValue={defaultValues.slideId}
                  >
                    <option value="">Select Slides</option>
                    {chatList.map((chat) => (
                      <option 
                        key={chat.id} 
                        value={chat.id}
                      >
                        {chat.title}
                      </option>
                    ))}
                  </select>
              }
              <button
                type="button"
                onClick={handleDialogOpen}
                className="btn-primary py-1 text-[14px] h-[40px] flex justify-center items-center"
              >
                Add New
              </button>
            </div>
            <p className="text-[12px] text-red-600">{errors.slideId?.message}</p>
          </div>

          <div className="grid grid-flow-row gap-1 min-w-0 text-[14px]">
            <label htmlFor="examFormat" className="text-primary">Select an Exam Format</label>
            <select
              {...register("examFormat", { required: "Exam format is required" })}
              className="px-5 py-2 border-[var(--bg-card)] text-secondary border min-w-0 rounded-[4px]"
              id="examFormat"
            >
              <option value="mcq">MCQ</option>
              <option value="theory">Theory</option>
            </select>
            <p className="text-[12px] text-red-600">{errors.examFormat?.message}</p>
          </div>

          <div className="grid grid-flow-row gap-1 min-w-0 text-[14px]">
            <label htmlFor="numberOfQuestions" className="text-primary">Number of Questions</label>
            <select
              {...register("numberOfQuestions", { required: "Number of questions is required" })}
              className="px-5 py-2 border-[var(--bg-card)] text-secondary border min-w-0 rounded-[4px]"
              id="numberOfQuestions"
            >
              {examFormat === "mcq" && (
                <>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </>
              )}
                            {examFormat === "theory" && (
                <>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </>
              )}
            </select>
            <p className="text-[12px] text-red-600">{errors.numberOfQuestions?.message}</p>
          </div>

          <button
            type="submit"
            className={`btn-primary px-5 py-2 mt-2 ${loading && 'cursor-pointer'}`}
            disabled={loading}
          >
            {!isRedirecting ? 'Start Exam' : <CircularProgress color='inherit' size={18} className="" />}
          </button>
        </>
      </form>

      <div className={`fixed inset-0 z-50 ${dialogOpen ? 'flex ' : 'hidden'}  items-center justify-center`}>
        <div className="blur-bg-4 backdrop-blur-sm fixed overflow-y-auto py-20 px-2 flex justify-center items-center w-screen min-h-screen top-0 left-0 bg-[var(--modal-bg)] z-[100000000000]">
          <div className="bg-[var(--dialogue-primary)] md:min-w-[500px] rounded shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Upload Slide</h2>
            <SlidesDropzone
              className="border hover:bg-hoverPrimary cursor-pointer text-primary border-dashed border-primary rounded p-5 text-center"
              onDrop={handleFileDrop}
              clearError={clearError}
            />
            {uploadError && <small className="text-[14px] text-red-600 mt-3">{uploadError}</small>}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleDialogClose}
                className='bg-ghost text-primary px-4 py-2 font-medium rounded-[4px] hover:bg-hoverPrimary text-[12px]'
              >
                Cancel
              </button>
              <button
                onClick={handleUploadClick}
                className="btn-primary px-5 py-2 text-[14px]"
              >
                {status || 'Upload'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSettings;

