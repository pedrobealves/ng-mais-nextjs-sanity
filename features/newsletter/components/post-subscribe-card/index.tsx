import { ChangeEvent, FormEvent, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export function SubscribeNewsletter() {
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
    <div className="flex flex-col items-start justify-center gap-8 rounded-3xl bg-primary-7 bg-gradient-newsletter px-8 py-11">
      <div className="flex w-full flex-col items-start justify-center gap-2 self-stretch text-left text-white">
        <p className="text-3xl font-bold leading-9">
          Inscreva-se em nosso newsletter
        </p>
        <p className="text-lg font-normal leading-7 opacity-90">
          Junte-se a nós para uma jornada semanal no emocionante universo dos
          jogos, com as principais notícias e tópicos mais pertinentes!
        </p>
      </div>
      <form
        name="email-form"
        data-name="Email Form"
        className="w-full"
        id="email-form"
        aria-label="Email Form"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 self-stretch rounded-3xl">
          <input
            type="email"
            className="sm:flex-1 w-full outline-none rounded-2xl py-4 px-4 md:px-8 text-base font-medium focus-within:ring focus-within:ring-secundary-5 text-primary-8"
            name="Email"
            data-name="Email"
            placeholder="Digite seu email"
            id="Email"
            value={emailInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmailInput(e.target.value)
            }
          />
          <button
            type="submit"
            className="sm:w-auto w-full bg-secundary-5 text-base text-white font-bold px-4 md:px-9 py-4 rounded-2xl hover:bg-secundary-6"
          >
            Inscreva-se
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  )
}
