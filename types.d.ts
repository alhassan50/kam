type DonateFormData = {
    anonymousDonor: boolean,
    fullName: string,
    phoneNumber: string,
    emailAddress: string,
    amount: string,
    paymentMethod: string
}

type ContactFormData = {
    fullName: string,
    emailAddress: string,
    message: string
}


type Link = {
    title: string;
    href: string;
    icon: string;
}

type ContactInfo = {
    title: string;
    description: string;
}