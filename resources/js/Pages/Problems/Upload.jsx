import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Link, Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';

const Upload = ({ auth, lesson }) => {
    const {data, setData, errors, post} = useForm({ problem: ''})
    const sbm = (e) => {
        e.preventDefault()
        post(route('lesson.uploadProblem', lesson.id))
    }
    const updateForm = (e) => {
        let d = { ...data }
        d.problem = e.target.value
        setData(d)
    }
    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false }>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <textarea 
                        value={ data.problem } 
                        onChange={ updateForm } 
                        className="w-full h-96" 
                        placeholder="tecla el problema"
                    />
                    <InputError message={ errors.problem } className="mt-2" />
                    <button type="submit" onClick={ sbm }>submit this shit</button>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Upload;
