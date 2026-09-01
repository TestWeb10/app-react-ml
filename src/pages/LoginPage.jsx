import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingBar from '../components/LoadingBar';
import ErrorsAlert from '../components/alerts/ErrorsAlert';

function LoginPage() {
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm()
    const { signIn, errors: authErrors, isLoading: authIsLoading, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home')
        }
    }, [isAuthenticated])

    const onSubmitSignIn = handleSubmit(async (obj) => {
        signIn(obj);
    })

    return (
        <div className=''>
            <div className='row-auto mt-5 m-auto bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <ErrorsAlert errors={authErrors} />
                <h1 className='text-2xl font-bold text-center'>Inicio de sesion</h1>
                <form onSubmit={onSubmitSignIn}>
                    <input type="text" {...register('username', {
                        required: {
                            value: true,
                            message: "El usuario es requerido"
                        }
                    })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Usuario' />
                    {
                        formErrors.username &&
                        <p className='text-red-500'>{formErrors.username.message}</p>
                    }
                    <input type="password" {...register('password', {
                        required: {
                            value: true,
                            message: "La contraseña es requerida"
                        }
                    })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Contraseña' />
                    {
                        formErrors.password &&
                        <p className='text-red-500'>{formErrors.password.message}</p>
                    }
                    <div className="text-center mt-4">
                        <button type="submit" className="m-2 p-2 font-semibold text-xl bg-rose-500 rounded-md">
                            Iniciar sesion
                        </button>
                    </div>
                </form>
            </div>
            {
                authIsLoading &&
                <div className="row-auto mt-5 m-auto bg-zinc-800 max-w-md w-full p-10 rounded-md'">
                    <LoadingBar />
                </div>
            }
        </div>
    )
}

export default LoginPage