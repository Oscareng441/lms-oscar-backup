import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ShowProblem from '@/Components/ShowProblem';
import TopMenu from '@/Components/TopMenu';
import FeedbackComponent from '@/Components/FeedbackComponent';
import EndOfSet from '@/Components/EndOfSet';
import HybridDisplay from '@/Components/HybridDisplay';
import { FaTrash, FaPlus, FaPencilAlt } from "react-icons/fa";
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { usePage, Link, Head } from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';

const EditProblemSet = ({ auth, problems, lesson, answers, hints }) => {
    const [probs, setProbs] = useState(problems)
    let { flash } = usePage().props;

    const title = `${ lesson.name } Ejercicios`

    let topMenu = (
        <TopMenu auth={auth} title={ title } lessonId={ lesson.id } show={['home', 'lesson', 'prob-add']} />
    )

    const deleteProblem = (p, k) => {
        fetch(route('problem.delete', { id: p.id}))
        .then(res => res.json())
        .then(
            (success) => {
                console.log(success)
                flash = success
            },
            (error) => {
                console.log('error', error)
                flash = error
            }
        )        
        let probsTmp = [ ...probs ]
        probsTmp.splice(k, 1)
        setProbs(probsTmp)    
    }

    const togglePublish = (p, k) => {
        fetch(route('problem.publish', { id: p.id, deactivate: p.active}))
        let probsTmp = [ ...probs ]
        probsTmp[k].active = !probsTmp[k].active
        setProbs(probsTmp)
    }

    const probList = probs.map((p, k) => {
        let problemSection
        if (p.display_type === 'text') { //deprecate
            problemSection = (
                <div dangerouslySetInnerHTML={{ __html: p.problem_text }} />
            )
        }
        if (p.display_type === 'html') {
            problemSection = (
                <div dangerouslySetInnerHTML={{ __html: p.problem_text }} />
            )
        }
        if (p.display_type === 'latex') {
            problemSection = (
                <Latex>{ p.problem_text }</Latex>
            )
        }
        if (p.display_type === 'pdf') {
            problemSection = (
                <iframe src={`/storage/${pageAssets.pdf}.pdf`} style={{width:"900px", height:"1200px"}} frameBorder="0" />
            )
        }
        if (p.display_type === 'hybrid') {
            problemSection = (
                <HybridDisplay content={ p.problem_text } />
            )
        }
        return (
            <div key={ k } className="flex flex-row justify-space">
                <div className="text-center bg-white p-1 m-2 shadow text-2xl sm:rounded-lg sm:p-2 border border-slate-200">
                    <Link href={ route('problem.show', p.id) }>{ problemSection }</Link>
                </div>
                <div className="flex items-center mx-2">
                    <Link href={ route('problem.edit', p.id)} >
                        <FaPencilAlt className="text-base mx-4 cursor-pointer" />
                    </Link>
                    <Checkbox
                        checked={ p.active }
                        onChange={ () => togglePublish(p, k) }
                        className='border border-black border-1'
                    />
                    <div className="text-sm ml-1 mr-2">
                        Publicar
                    </div>
                    <FaTrash className="text-base ml-2 cursor-pointer" onClick={ () => deleteProblem(p, k) } />
                </div>
            </div>
        )
    })

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu } >
            <Head title={title} />
            { flash.success && flash.success}
            { flash.error && flash.error}
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="italic text-2xl">
                        Haz clic en un problema para contestarlo.
                        <p className="not-italic text-lg text-green-600">
                            <Link href={route("problemset.student", lesson.id)}>Go to student mode</Link>
                        </p>
                    </div>
                    <div className="text-center bg-white p-1 shadow text-2xl sm:rounded-lg sm:p-8">
                        { probList }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default EditProblemSet;
