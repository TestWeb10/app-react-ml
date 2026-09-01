import { useEffect, useState } from "react";

function ErrorsAlert({ errors }) {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (errors.message) {
            setShowAlert(true)
        } else {
            setShowAlert(false)
        }
    }, [errors])

    return (
        <>
            {
                showAlert ? (
                    <div className={errors.status === 200 ? "mt-5 text-white px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500" : "mt-5 text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500"} >
                        <span className="text-xl inline-block mr-5 align-middle">
                            <i className="fas fa-bell" />
                        </span>
                        <span className="inline-block align-middle">
                            <div className="text-center">
                                <b>
                                    ({errors.status})
                                </b>
                            </div>
                            <div className="text-center whitespace-pre-wrap">
                                {errors.message}
                            </div>
                        </span>
                        <button
                            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" onClick={() => setShowAlert(false)}>
                            <span>×</span>
                        </button>
                    </div>
                ) : null
            }
        </>
    )
}

export default ErrorsAlert