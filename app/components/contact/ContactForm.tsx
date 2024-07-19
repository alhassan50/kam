'use client'

import { useForm, SubmitHandler} from "react-hook-form";
import Arrow from "../shared/Arrow";

function ContactForm() {
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors },
        setValue,
        clearErrors,
        reset,
      } = useForm<ContactFormData>({
        defaultValues: {
            fullName: '',
            emailAddress: '',
            message: ''
        }
      });

      const onSubmit: SubmitHandler<ContactFormData> = (data) => {
        console.log(data); // Handle form submission here
      };

      const clearFieldError = (fieldName: keyof ContactFormData, value: string) => {
        setValue(fieldName, value);
        clearErrors(fieldName);
      }

      const FormHeader = () => 
        <div className="grid gap-1">
            <h2 className="text-xl md:text-2xl">
                Get in Touch
            </h2>
        </div>

    return (
        <div className="order-first lg:order-last">
            <div className='max-w-[500px] mx-auto p-5 md:p-10 rounded-[4px] border-[var(--bg-card)] bg-[var(--hover-card)]'>
                <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <FormHeader />

                    <div className="grid grid-flow-row gap-1">
                        <label>
                            Full Name
                        </label>
                        <input 
                            type="text"
                            placeholder="John Doe"
                            className={`px-5 py-2 rounded-[4px]`}
                            {...register("fullName", {
                            required: "Your full name is required",
                            maxLength: { value: 50, message: "Full name should not exceed 50 characters" }
                            })}
                            onChange={(e) => clearFieldError("fullName", e.target.value)}
                        />
                        <p className="text-[12px] text-red-600">{errors?.fullName?.message}</p>
                    </div>
                    
                    <div className="grid grid-flow-row gap-1 min-w-0">
                        <label htmlFor="">
                            Email Address
                        </label>
                        <input 
                            type="email"
                            placeholder="abc@gmail.com"
                            className={`px-5 py-2 min-w-0 rounded-[4px]`}
                            {...register("emailAddress", {
                                required: "Your email address is required",
                                pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                                message: "Please enter a valid email address"
                                }
                            })}
                            id="emailAddress"
                            onChange={(e) => clearFieldError("emailAddress", e.target.value)}
                        />
                        <p className="text-[12px] text-red-600">{errors?.emailAddress?.message}</p>
                    </div>

                    <div className="grid grid-flow-row gap-1 min-w-0">
                        <label htmlFor="message">
                            Message
                        </label>    
                        <textarea 
                            className="px-5 py-2 min-w-0 rounded-[4px] text-black"
                            id="message"
                            title="message"
                            placeholder="How can we help?"
                            {...register("message", {
                                required: "Don't forget to add your message!",
                                maxLength: { value: 200, message: "Message should not exceed 200 characters" }
                            })}
                        ></textarea>
                        <p className="text-[12px] text-red-600">{errors?.message?.message}</p>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary group flex justify-center items-center gap-2 mt-3"
                    >
                        Send Message

                        <div className="gro group-hover:translate-x-1 transition-all duration-150">
                            <Arrow width={32} />
                        </div>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ContactForm