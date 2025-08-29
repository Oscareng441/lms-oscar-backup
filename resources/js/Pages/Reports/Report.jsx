import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TopMenu from '@/Components/TopMenu';
import LmsTable from '@/Components/LmsTable';
import StudentSelect from '@/Components/StudentSelect';
import AggSelect from '@/Components/AggSelect';
import { Link } from '@inertiajs/react';
import { buildBreadCrumbs } from '@/Helpers/Utilities';

export default function Report({ auth, course, group, chapter, lesson, scores, students, unit, unitId, agg, studentId }) {
    const [level, setLevel] = useState(unit) // course, chapter, lesson
    const [levelId, setLevelId] = useState(unitId) // id of course, chapter, lesson
    const [newAgg, setNewAgg] = useState(agg)
    const [student, setStudent] = useState(studentId) // 0 or id

    const title = 'Informe ' + group.name
    const levels =['C', 'LS', 'L', 'P']
    const levelIdx = levels.indexOf(level)
    const aggIdx = levels.indexOf(agg)
    const nextLevel = level === 'P' ? null : levels[levelIdx + 1] 
    const nextAgg = agg === 'P' ? null : levels[aggIdx + 1] 
    const breadcrumbs = buildBreadCrumbs({course}, 2)
    let topMenu = (
        <TopMenu
            auth={auth}
            title={ title }
            courseId={ course.id }
            show={['home', 'course', 'group-mg']}
            breadcrumbs={ breadcrumbs }
        />
    )

    function formatStudent(data) {
        if (student == data.userId) {
            return data.userName
        }
        return (<Link href={ route('group.report', {groupId: group.id, agg: agg, unit: level, unitId: unitId, studentId: data.userId})}>{data.userName}</Link>)
    }

    function formatEducationalUnit(data) {
        console.log(data)
        if (agg == 'P') {
            return data.unit
        }
        return (<Link href={ route('group.report', {groupId: group.id, agg: nextAgg, unit: agg, unitId: data.unitId, studentId: studentId})}>{data.unit}</Link>)
    }

    function problemLink(data) {
        return (<Link href={ route('problem.show', {id: data.unitId}) }>{data.unitId}</Link>)
    }

    const columns = [
        {
            title: 'Estudiante',
            field: 'userName',
            sortable: true,
            displayFormatter: formatStudent,
        },
        {
            title: 'Unidad',
            field: 'unit',
            sortable: true,
            displayFormatter: formatEducationalUnit,
        },
        {
            title: '# Problemas',
            field: 'numProblems',
            sortable: true,
        },
        {
            title: '# Contestado',
            field: 'problemsDone',
            sortable: true,
        },
        {
            title: '% Correcto',
            field: 'userScore',
            sortable: true,
        },
    ];

    let initialSort = "name"

    if (agg === 'C') {
        columns[1].title = 'Curso'
    }

    if (agg === 'LS') {
        columns[1].title = 'Capítulo'
    }

    if (agg === 'L') {
        columns[1].title = 'Lección'
    }

    if (agg === 'P') {
        columns[1].title = 'id de Problema'
        columns[1].field = 'unitId'
        columns[1].displayFormatter = problemLink
        delete columns[3]
        delete columns[2]
        initialSort = 'unitId'
    }

    const selectStudent = (e) => {
        setStudent(e.value)
    }

    const selectAgg = (e) => {
        setNewAgg(e.value)
    }

    const aggs = [
        { name: 'Curso', id: 'C'},
        { name: 'Capítulo', id: 'LS'},
        { name: 'Lección', id: 'L'},
        { name: 'Problema', id: 'P'},
    ]
console.log(lesson, unit)
    let orientation = (
        <>
            <div className="">
                Curso: 
                <Link 
                    href={route('group.report', {groupId: group.id, agg: 'C', unit: 'C', unitId: course.id, studentId: student})}
                    className="ml-2"
                >
                    { course.name }
                </Link>
            </div>
            {
                unit !== 'C' &&
                <div className="pl-6">
                    Capítulo: 
                    <Link 
                        href={route('group.report', {groupId: group.id, agg: 'LS', unit: 'LS', unitId: chapter.id, studentId: student})}
                        className="ml-2"
                    >
                        { chapter.name }
                    </Link>
                </div>
            }
            {
                unit !== 'C' && unit !== 'LS' &&
                <div className="pl-6">
                    Lección: 
                    <Link 
                        href={route('group.report', {groupId: group.id, agg: 'L', unit: 'L', unitId: lesson.id, studentId: student})}
                        className="ml-2"
                    >
                        { lesson.name }
                    </Link>
                </div>
            }
        </>
    )

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            <div className="p-8 border border-black rounded-md max-w-7xl mx-auto shadow-xl shadow-indigo-200">
                <div className="py-2">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-row">
                        { orientation }
                    </div>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-row">
                        <div className="w-1/2 rounded-s-sm">
                            <StudentSelect 
                                students={students}
                                selected={studentId}
                                onSelect={selectStudent}
                            />
                        </div>
                        <div className="w-1/2 ">
                            <AggSelect 
                                aggs={aggs}
                                selected={agg}
                                onSelect={selectAgg}
                            />
                        </div>
                    </div>
                </div>
                <Link 
                    href={ route('group.report', {groupId: group.id, agg: newAgg, unit: level, unitId: unitId, studentId: student})}
                >
                    <div className="mx-auto text-center w-[100px] sm:px-6 lg:px-8 border border-black rounded-md shadow-lg shadow-indigo-200 bg-white">
                        <div className="">Ir</div>
                    </div>
                </Link>
            </div>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <LmsTable
                        columns={columns}
                        data={scores}
                        initialSort={initialSort}
                        downloadLink="/export-csv"
                        downloadParams={[ 
                            {key: 'g', val: group.id},
                            {key: 'agg', val: agg},
                            {key: 's', val: studentId},
                            {key: 'type', val: "report"}
                        ]}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
