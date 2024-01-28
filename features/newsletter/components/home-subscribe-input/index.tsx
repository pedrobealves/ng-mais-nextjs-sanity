import { ChangeEvent, FormEvent, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export function InputNewsletter() {
  const [emailInput, setEmailInput] = useState('')
  const [buttonLoading, setButtonLoading] = useState(false)

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!emailInput) {
      return toast.warn('Email é obrigatório', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }

    setButtonLoading(true)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email: emailInput }),
      })
      const data = await res.json()

      if (data.success) {
        toast.success('Inscrição realizada com sucesso!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      } else {
        throw new Error(
          data?.error || 'Something went wrong, please try again later',
        )
      }
    } catch (e) {
      toast.error((e as Error).message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }

    setEmailInput('')
    setButtonLoading(false)
  }

  return (
    <section className="container mx-auto pb-10">
      <form
        name="email-form"
        data-name="Email Form"
        id="email-form"
        aria-label="Email Form"
        onSubmit={handleFormSubmit}
        className="w-full flex justify-between rounded-full bg-white border-gray-200 border-[16px] max-w-col-6"
      >
        <input
          type="email"
          className="sm:flex-1 w-full outline-none rounded-full pl-8 pr-4 text-lg font-medium"
          placeholder=" Digite seu e-mail"
          value={emailInput}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmailInput(e.target.value)
          }
        />
        <button className="bg-secundary-4 text-white font-bold sm:px-9 px-5 py-5 rounded-full hover:bg-secundary-5 m-2">
          <p className="sm:block hidden">Inscreva-se</p>
          <p className="sm:hidden block">Ic</p>
        </button>
      </form>
      <ToastContainer />
    </section>
  )
}
