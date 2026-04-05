import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CourseComponent from "@/Components/CourseComponent";
import TopMenu from "@/Components/TopMenu";
import { router, Link, Head } from "@inertiajs/react";

const Index = ({ auth, courses, myProgress }) => {
    const [courseList, setCourseList] = useState(courses);
    useEffect(() => {
        onlyPub()
    }, [])

    const title = "Cursos";

    let topMenu = <TopMenu auth={auth} title={title} show={["course-add"]} />;

    function onlyUnpub() {
        setCourseList(courses.filter((x) => {
            return x.active === 0;
        }))
    }

    function onlyPub() {
        setCourseList(courses.filter((x) => {
            return x.active === 1;
        }))
    }

    function showAll() {
        setCourseList(courses)
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={false}
            topMenu={topMenu}
        >
            {auth.is_admin &&
                <div className="text-sm sm:text-md flex">
                    <div className="cursor-pointer ml-8" onClick={onlyUnpub}>
                        Solo No Publicados
                    </div>
                    <div className="cursor-pointer ml-8" onClick={onlyPub}>
                        Solo Publicados
                    </div>
                    <div className="cursor-pointer ml-8" onClick={showAll}>
                        Todos
                    </div>
                </div>
            }
            {courseList.map((course, k) => {
                let progress =
                    myProgress !== null && course.id in myProgress
                        ? myProgress[course.id]
                        : null;
                return (
                    <CourseComponent
                        key={k}
                        course={course}
                        progress={progress}
                        showProgress={true}
                    />
                );
            })}
        </AuthenticatedLayout>
    );
};

export default Index;
