'use client'

import { Metadata } from "next";
import Image from "next/image"
import { useState } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";

type FormData = {
  anonymousDonor: boolean,
  fullName: string,
  phoneNumber: string,
  emailAddress: string,
  amount: string,
  paymentMethod: string
}

function Donate() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      anonymousDonor: false,
      fullName: '',
      phoneNumber: '',
      emailAddress: '',
      amount: '',
      paymentMethod: ''
    }
  });

  const isAnonymousDonor = watch("anonymousDonor")
  const [step, setStep] = useState<number>(1)

  const nextStep = () => {
    const fieldsToValidate: ("fullName" | "emailAddress" | "phoneNumber" | "amount")[] = [];
  
    if (!isAnonymousDonor) {
      fieldsToValidate.push("fullName", "emailAddress");
    }
    
    fieldsToValidate.push("phoneNumber", "amount");

    trigger(fieldsToValidate)
    .then((isValid) => {
      if (isValid) {
        setStep((prevStepValue) => prevStepValue + 1);
      }
    });
  }
  
  const previousStep = () => {
    setStep(prevStepValue => prevStepValue - 1)
  }

  const clearFieldError = (fieldName: keyof FormData, value: string) => {
    setValue(fieldName, value);
    clearErrors(fieldName);
  }

  const handleAnonymousDonorChange = () => {
    const newValue = !isAnonymousDonor;
    setValue("anonymousDonor", newValue);
    if (newValue) {
      setValue("fullName", '');
      setValue("emailAddress", '');
      clearErrors("fullName");
      clearErrors("emailAddress");
    }
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data); // Handle form submission here
  };

  return (
    <main>
      <h1>Support Our Mission</h1>
      <div className='grid gap-5 md:gap-10 lg:grid-cols-2 mt-10'>
        <section className="">
          <p className=''>
            Your generosity helps us continue our mission to provide quality education and resources through the Knowledge Assessment Module (KAM). Your donation will directly contribute to the development of new features, maintenance of our platform, and support for students and educators around the world. Every contribution, no matter the size, makes a significant impact.
          </p>
          <p className='mt-2'>
            Thank you for considering a donation to KAM. Together, we can make a difference in the lives of many.
          </p>
          
          <p className='mt-2'>
            We accept MoMo payment from the following networks:
          </p>

          <div className="flex gap-2 mt-3">
            <figure 
              title="Vodafone"
              className="bg-white overflow-hidden group flex justify-center items-center rounded-[4px] p-2 cursor-pointer"
            >
              <Image
                src={'/assets/images/voda.png'}
                width={100}
                height={100}
                alt="mtn"
                className="group-hover:scale-[1.1] transition-all duration-200 w-[72px] h-auto"
              />
            </figure>

            <figure 
              title="MTN"
              className="bg-yellow-500 overflow-hidden group flex justify-center items-center rounded-[4px] p-2 cursor-pointer"
            >
              <Image
                src={'/assets/images/mtn.svg'}
                width={100}
                height={100}
                alt="mtn"
                className="group-hover:scale-[1.1] transition-all duration-200 w-[48px] h-auto"
              />
            </figure>
            
            <figure 
              title="AirtelTigo"
              className="bg-[#fff] overflow-hidden group flex justify-center items-center rounded-[4px] p-2 cursor-pointer"
            >
              <Image
                src={'/assets/images/at.png'}
                width={100}
                height={100}
                alt="mtn"
                className="group-hover:scale-[1.1] transition-all duration-200 w-[72px] h-auto"
              />
            </figure>
            
            <figure 
              title="AirtelTigo"
              className="bg-[green] overflow-hidden group flex justify-center items-center rounded-[4px] p-2 cursor-pointer"
            >
              <Image
                src={'/assets/images/glo.png'}
                width={100}
                height={100}
                alt="mtn"
                className="group-hover:scale-[1.1] transition-all duration-200 w-[48px] h-auto"
              />
            </figure>
          </div>
        </section>
        
        <section>
          <div className='p-5 md:p-10 rounded-[4px] group border-[var(--bg-card)] bg-[var(--hover-card)]'>
            <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-1">
                <h2 className="text-xl md:text-2xl">
                  Make a Donation
                </h2>
                <figure className="group-hover:scale-125 transition-all duration-150">
                  ❤️
                </figure>
              </div>

              {
                step === 1 &&
                <div className="grid gap-5">
                  <div className="flex gap-2">
                    <input 
                      type="checkbox"
                      id="anonymousDonor"
                      className="px-5 py-2 rounded-[4px]"
                      title="Anonymous Donor"
                      {...register("anonymousDonor")}
                      onChange={handleAnonymousDonorChange}
                    />
                    <label htmlFor="anonymousDonor">
                      Anonymous Donor
                    </label>
                  </div>
                  
                  <div className="grid grid-flow-row gap-1">
                    <label>
                      Full Name
                    </label>
                    <input 
                      type="text"
                      id="fullName"
                      placeholder="John Doe"
                      className={`px-5 py-2 rounded-[4px] ${isAnonymousDonor ? 'cursor-not-allowed' : ''}`}
                      {...register("fullName", {
                        required: "Your full name is required",
                        maxLength: { value: 50, message: "Full name should not exceed 50 characters" }
                      })}
                      disabled={isAnonymousDonor}
                      onChange={(e) => clearFieldError("fullName", e.target.value)}
                    />
                    <p className="text-[12px] text-red-600">{errors?.fullName?.message}</p>
                  </div>
                  
                  <div className="grid gap-5 sm:grid-cols-2 w-full">
                    <div className="grid grid-flow-row gap-1 min-w-0">
                      <label>
                        Phone Number
                      </label>
                      <input 
                        type="tel"
                        id="phoneNumber"
                        placeholder="0123456789"
                        className={`px-5 py-2 rounded-[4px] min-w-0`}
                        {...register("phoneNumber", {
                          required: "Your phone number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Please enter a valid 10-digit phone number"
                          }
                        })}
                        onChange={(e) => clearFieldError("phoneNumber", e.target.value)}
                      />
                      <p className="text-[12px] text-red-600">{errors?.phoneNumber?.message}</p>
                    </div>
                    
                    <div className="grid grid-flow-row gap-1 min-w-0">
                      <label>
                        Email Address
                      </label>
                      <input 
                        type="email"
                        id="email"
                        placeholder="abc@gmail.com"
                        className={`px-5 py-2 min-w-0 rounded-[4px] ${isAnonymousDonor ? 'cursor-not-allowed' : ''}`}
                        {...register("emailAddress", {
                          required: "Your email address is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                            message: "Please enter a valid email address"
                          }
                        })}
                        disabled={isAnonymousDonor}
                        onChange={(e) => clearFieldError("emailAddress", e.target.value)}
                      />
                      <p className="text-[12px] text-red-600">{errors?.emailAddress?.message}</p>
                    </div>
                  </div>

                  <div className="grid grid-flow-row gap-1">
                    <label>
                      Enter Any Amount:
                    </label>
                    <input 
                      type="text"
                      id="amount"
                      placeholder="GHC 100"
                      className="px-5 py-2 rounded-[4px]"
                      {...register("amount", {
                        required: "An amount is required",
                        pattern: {
                          value: /^[0-9]+(\.[0-9]{1,2})?$/,
                          message: "Please enter a valid amount (digits with optional decimal)"
                        }
                      })}
                      onChange={(e) => clearFieldError("amount", e.target.value)}
                    />
                    <p className="text-[12px] text-red-600">{errors?.amount?.message}</p>
                  </div>

                  <button
                    type="button"
                    className="btn-primary flex justify-center items-center gap-2"
                    onClick={() => nextStep()}
                  >
                    Select Payment Method

                    <svg 
                      viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" 
                      className="w-[32px]"
                    >
                      <defs>
                        <style>
                          {`.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}`}
                        </style>
                      </defs>
                      <title>arrow-right</title>
                      <g id="arrow-right">
                        <line className="cls-1" x1="29.08" x2="3.08" y1="16" y2="16" />
                        <line className="cls-1" x1="29.08" x2="25.08" y1="16" y2="21" />
                        <line className="cls-1" x1="29.08" x2="25.08" y1="16" y2="11" />
                      </g>
                  </svg>

                  </button>
                </div>
              }

              {
                step === 2 &&
                <div className="grid gap-1">
                  <button 
                    onClick={() => previousStep()}
                    className="my-1 flex gap-2 items-center hover:underline"
                    type="button"                  >
                    <figure className="rotate-180">
                      <svg 
                        viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" 
                        className="w-[18px]"
                      >
                        <defs>
                          <style>
                            {`.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}`}
                          </style>
                        </defs>
                        <title>arrow-right</title>
                        <g id="arrow-right">
                          <line className="cls-1" x1="29.08" x2="3.08" y1="16" y2="16" />
                          <line className="cls-1" x1="29.08" x2="25.08" y1="16" y2="21" />
                          <line className="cls-1" x1="29.08" x2="25.08" y1="16" y2="11" />
                        </g>
                    </svg>
                    </figure>
                    <p className="text-[14px]">
                      Go Back
                    </p>
                  </button>
                  <h3 className=" text-lg">Please Select a Payment Method</h3>
                  {
                    ["MTN MoMo", "Voda Cash", "AirtelTigo Cash", "Glo Mobile Money"].map((method, index) => (
                      <div className="flex gap-2" key={index}>
                        <input 
                          type="radio"
                          className="px-5 py-2 rounded-[4px]"
                          id={method.replace(/\s+/g, '').toLowerCase()}
                          title={method}
                          value={method.replace(/\s+/g, '').toLowerCase()}
                          {...register("paymentMethod", {
                            required: "Please select a payment method"
                          })}
                        />
                        <label htmlFor={method.replace(/\s+/g, '').toLowerCase()}>
                          {method}
                        </label>
                      </div>
                    ))
                  }
                  <p className="text-[12px] text-red-600">{errors?.paymentMethod?.message}</p>

                  <button
                    type="submit"
                    className="btn-primary flex justify-center items-center gap-2 mt-3"
                  >
                    Donate

                    <svg 
                      viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" 
                      className="w-[32px]"
                    >
                      <defs>
                        <style>
                          {`.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}`}
                        </style>
                      </defs>
                      <title>arrow-right</title>
                      <g id="arrow-right">
                        <line className="cls-1" x1="29.08" x2="3.08" y1="16" y2="16" />
                        <line className="cls-1" x1="29.08" x2="25.08" y1="16" y2="21" />
                        <line className="cls-1" x1="29.08" x2="25.08" y1="16" y2="11" />
                      </g>
                    </svg>

                  </button>
                </div>
              }

            </form>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Donate;
