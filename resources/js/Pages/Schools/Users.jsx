import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TopMenu from '@/Components/TopMenu';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import ObjContainer from '@/Components/ObjContainer';
import { useForm, Link, Head } from '@inertiajs/react';
import { MdClear } from "react-icons/md";
import { buildBreadCrumbs } from '@/Helpers/Utilities';

const Groups = ({ auth, school, allStudents, teachersThisGroup }) => {  
    const [filter, setFilter] = useState('')
    const [students, setStudents] = useState(allStudents)
    const [inGroup, setInGroup] = useState([])
    const [notInGroup, setNotInGroup] = useState([])
    const [teachers, setTeachers] = useState(teachersThisGroup)
    const [owners, setOwners] = useState([])
    const [availableTeachers, setAvailableTeachers] = useState([])
    const [inGroupFiltered, setInGroupFiltered] = useState([])
    const [notInGroupFiltered, setNotInGroupFiltered] = useState([])
    const [tchrsInGroupFiltered, setTchrsInGroupFiltered] = useState([])
    const [tchrsNotInGroupFiltered, setTchrsNotInGroupFiltered] = useState([])
    const { data, setData, post } = useForm({
            name: school ? school.name : '',
            id: school ? school.id : null,
            active: school.active,
            students: [],
            teachers: [],
    })

    const submit = (e) => {
            post(route('school.save'), {
                onError: () => console.log('error'),
                onSuccess: () => console.log('ok'),
            });
            e.preventDefault();
    }

    const updateName = (e) => {
            let d = { ...data }
            d.name = e.target.value
            setData(d)
    }

    const title = 'Escuela ' + school.name

    const addMember = () => {
        console.log(selected.id)
    }

    useEffect(() => {
        let inGp = []
        let notInGp = []
        allStudents.forEach(s =>{
            if (s.is_member > 0) {
                inGp.push(s)
            } else {
                notInGp.push(s)
            }
        })
        let inOwnerGp = []
        let availableTchrs = []
        teachersThisGroup.forEach(s =>{
            if (s.is_member > 0) {
                inOwnerGp.push(s)
            } else {
                availableTchrs.push(s)
            }
        })
        setInGroup(inGp)
        setNotInGroup(notInGp)
        setOwners(inOwnerGp)
        setAvailableTeachers(availableTchrs)
        setInGroupFiltered(inGp)
        setNotInGroupFiltered(notInGp)
        setTchrsInGroupFiltered(inOwnerGp)
        setTchrsNotInGroupFiltered(availableTchrs)
    }, [])

    useEffect(() => {
        let a = filter.length ? [ ...inGroup ].filter(x => { return x.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0}) : [ ...inGroup ]
        let b = filter.length ? [ ...notInGroup ].filter(x => { return x.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0}) : [ ...notInGroup ]
        setInGroupFiltered(a)
        setNotInGroupFiltered(b)
        let d = { ...data }
        d.students = a
        let y = filter.length ? [ ...owners ].filter(x => { return x.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0}) : [ ...owners ]
        let z = filter.length ? [ ...availableTeachers ].filter(x => { return x.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0}) : [ ...availableTeachers ]
        setTchrsInGroupFiltered(y)
        setTchrsNotInGroupFiltered(z)
        d.teachers = y
        setData(d)
    }, [filter, inGroup, notInGroup, owners, availableTeachers])

    const breadcrumbs = [{name: 'Escuelas', link: '/schools'}, {name: school.name, link: '#'}]

    let topMenu = (
        <TopMenu
            auth={auth}
            title={ title }
            show={['home']}
            breadcrumbs={ breadcrumbs }
        />
    )

    const remove = (id) => {
        let a = [ ...notInGroup ];
        let b = [ ...inGroup ];
        let nw = b.filter(x => {return x.id === id})
        a.push(nw[0])
        setNotInGroup(a)
        let c = removeFromGroup(nw[0], b)
        setInGroup(c)
    }

    const add = (id) => {
        let a = [ ...inGroup ]
        let b = [ ...notInGroup ]
        let nw = b.filter(x => {return x.id === id})
        a.push(nw[0])
        setInGroup(a)
        let c = removeFromGroup(nw[0], b)
        setNotInGroup(c)
    }

    const removeT = (id) => {
        let a = [ ...availableTeachers ];
        let b = [ ...owners ];
        let nw = b.filter(x => {return x.id === id})
        a.push(nw[0])
        setAvailableTeachers(a)
        let c = removeFromGroup(nw[0], b)
        setOwners(c)
    }

    const addT = (id) => {
        let a = [ ...owners ]
        let b = [ ...availableTeachers ]
        let nw = b.filter(x => {return x.id === id})
        a.push(nw[0])
        setOwners(a)
        let c = removeFromGroup(nw[0], b)
        setAvailableTeachers(c)
    }

    const removeFromGroup= (student, gp) => {
        let a = [ ...gp ]
        let idx = -1
        gp.some((d, k) => {
            if (d.id === student.id) {
                idx = k
                return true
            }
            return false
        })
        a.splice(idx, 1)
        return a
    }

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            <div className="text-center w-full">
                <div className="text-center max-w-7xl bg-white rounded-md my-2 mx-auto shadow">
                    <div>
                        <InputLabel value="Nombre del Grupo:"/>
                        <input className="w-1/2" type='text' value={ data.name } onChange={ updateName } />
                    </div>
                    <div>
                        <PrimaryButton onClick={ submit } className="my-2">
                            GUARDAR
                        </PrimaryButton>
                    </div>
                </div>
                <div className="text-center max-w-7xl bg-white rounded-md my-2 mx-auto shadow">
                    <div>
                        Estudiantes
                    </div>
                    <div className="mx-auto w-full pt-5 flex flex-row justify-center">
                        <ObjContainer data={ inGroupFiltered } title="Estudiantes" onDblClk={ remove } />
                        <div className="flex flex-row">
                            <input
                                className="h-6"
                                value={filter}
                                onChange={(e) => {setFilter(e.target.value)}}
                                placeholder="Filtrar Nombres..."
                            />
                            <MdClear onClick={ () => setFilter('') }/>
                        </div>
                        <ObjContainer data={ notInGroupFiltered } title="Estudiantes Disponibles" onDblClk={ add } />
                    </div>
                </div>
                <div className="text-center max-w-7xl bg-white rounded-md my-2 mx-auto shadow">
                    <div>
                        Maestros
                    </div>
                    <div className="mx-auto w-full pt-5 flex flex-row justify-center">
                        <ObjContainer data={ tchrsInGroupFiltered } title="Maestros" onDblClk={ removeT } />
                        <div className="flex flex-row">
                            <input
                                className="h-6"
                                value={filter}
                                onChange={(e) => {setFilter(e.target.value)}}
                                placeholder="Filtrar Nombres..."
                            />
                            <MdClear onClick={ () => setFilter('') }/>
                        </div>
                        <ObjContainer data={ tchrsNotInGroupFiltered } title="Maestros Disponibles" onDblClk={ addT } />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Groups;
