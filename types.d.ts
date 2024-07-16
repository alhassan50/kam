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

type FeaturePlan = {
    feature: {
        name: string;
    };
    supported: boolean;
};

type Plan =  {
    name: string;
    features: FeaturePlan[]
    recommended: boolean;
    price: number;
    duration: string;
}

type FAQ = {
    question: string;
    answer: string;
}

type Feature = {
    title: string;
    description: string;
    link: null | string;
}

type LogInFormData = {
    emailAddress: string,
    password: string
}