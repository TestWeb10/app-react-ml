import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useSicofiData } from '../context/SicofiDataContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingBar from '../components/LoadingBar';
import ErrorsAlert from '../components/alerts/ErrorsAlert';

function LoginPage() {
    const { register: registerAuth, handleSubmit: handleSubmitAuth, formState: { errors: formErrorsAuth } } = useForm()
    const { register: registerSicofiData, handleSubmit: handleSubmitSicofiData, formState: { errors: formErrorsSicofiData }, reset: resetSicofiData } = useForm()
    const { signIn, errors: authErrorsAuth, isLoading, isAuthenticated } = useAuth()
    const { changePassword, errors: authErrorsSicofiData, isOk: isOkSicofiData } = useSicofiData()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home')
        }
        if (isOkSicofiData) {
            resetSicofiData()
        }
    }, [isAuthenticated, isOkSicofiData])

    const onSubmitSignIn = handleSubmitAuth(async (obj) => {
        signIn(obj);
    })

    const onSubmitChangePassword = handleSubmitSicofiData(async (obj) => {
        changePassword(obj);
    })

    return (
        <div className=''>
            <div className='row-auto mt-5 m-auto bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <ErrorsAlert errors={authErrorsAuth} />
                <h1 className='text-2xl font-bold text-center'>Inicio de sesion</h1>
                <form onSubmit={onSubmitSignIn}>
                    <input type="text" {...registerAuth('username', {
                        required: {
                            value: true,
                            message: "El usuario es requerido"
                        }
                    })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Usuario' />
                    {
                        formErrorsAuth.username &&
                        <p className='text-red-500'>{formErrorsAuth.username.message}</p>
                    }
                    <input type="password" {...registerAuth('password', {
                        required: {
                            value: true,
                            message: "La contraseña es requerida"
                        }
                    })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Contraseña' />
                    {
                        formErrorsAuth.password &&
                        <p className='text-red-500'>{formErrorsAuth.password.message}</p>
                    }
                    <div className="text-center mt-4">
                        <button type="submit" className="m-2 p-2 font-semibold text-xl bg-rose-500 rounded-md">
                            Iniciar sesion
                        </button>
                    </div>
                </form>
            </div>
            {
                isLoading &&
                <div className="row-auto mt-5 m-auto bg-zinc-800 max-w-md w-full p-10 rounded-md'">
                    <LoadingBar />
                </div>
            }
            <div className='row-auto mt-5 m-auto bg-zinc-800 max-w-xl w-full p-10 rounded-md'>
                <ErrorsAlert errors={authErrorsSicofiData} />
                <h1 className='text-xl font-bold text-center mb-5'>Cambiar contraseña registrada de Sicofi</h1>
                <form onSubmit={onSubmitChangePassword}>
                    <input type="text" {...registerSicofiData('username_sic', {
                        required: {
                            value: true,
                            message: "El usuario de Sicofi es requerido"
                        }
                    })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Usuario Sicofi' />
                    {
                        formErrorsSicofiData.username_sic &&
                        <p className='text-red-500'>{formErrorsSicofiData.username_sic.message}</p>
                    }
                    <input type="password" {...registerSicofiData('old_password_sic', {
                        required: {
                            value: true,
                            message: "La antigua contraseña de Sicofi es requerida"
                        }
                    })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Antigua contraseña Sicofi' />
                    {
                        formErrorsSicofiData.old_password_sic &&
                        <p className='text-red-500'>{formErrorsSicofiData.old_password_sic.message}</p>
                    }
                    <input type="password" {...registerSicofiData('new_password_sic', {
                        required: {
                            value: true,
                            message: "La nueva contraseña de Sicofi es requerida"
                        }
                    })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Nueva contraseña Sicofi' />
                    {
                        formErrorsSicofiData.new_password_sic &&
                        <p className='text-red-500'>{formErrorsSicofiData.new_password_sic.message}</p>
                    }
                    <div className="text-center mt-4">
                        <button type="submit" className="m-2 p-2 font-semibold text-xl bg-blue-500 rounded-md">
                            Cambiar contraseña
                        </button>
                    </div>
                </form>
            </div>
            {
                isOkSicofiData &&
                <div className="row-auto mt-5 mb-5 text-center m-auto bg-green-800 max-w-md w-full p-10 rounded-md'">
                    <p className="m-auto">La contraseña se cambio correctamente</p>
                </div>
            }
        </div>
    )
}

export default LoginPage