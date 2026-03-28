import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import HybridDisplay from "@/Components/HybridDisplay";
import TopMenu from "@/Components/TopMenu";
import BottomMenu from "@/Components/BottomMenu";
import VideoComponent from "@/Components/VideoComponent";
import { router, Link, Head } from "@inertiajs/react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { buildBreadCrumbs } from "@/Helpers/Utilities";

const Index = ({
    auth,
    lesson,
    chapter,
    course,
    lessonIds,
    problemSet,
    pageAssets,
}) => {
    const [htmlContent, setHtmlContent] = useState(lesson.lesson_text);
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        fetch(route("lesson.videos", { id: lesson.id }))
            .then((res) => res.json())
            .then(
                (results) => {
                    setVideos(results);
                },
                (error) => {
                    console.log("error", error);
                },
            );
    }, []);
    const title = `${lesson.short_name}`;
    let lessonSection, problemSection;
    if (lesson.lesson_type === "html" || lesson.lesson_type === "text") {
        lessonSection = (
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        );
    }
    if (lesson.lesson_type === "latex") {
        lessonSection = <Latex>{lesson.lesson_text}</Latex>;
    }
    if (lesson.lesson_type === "pdf") {
        lessonSection = (
            <iframe
                src={`/storage/${pageAssets.pdf}.pdf`}
                style={{ width: "100%", height: "1200px" }}
                frameBorder="0"
            />
        );
    }
    if (lesson.lesson_type === "hybrid") {
        lessonSection = <HybridDisplay content={lesson.lesson_text} />;
    }
    let iconNav = ["home", "prob-add", "chapter", "lesson-edit"]
    if (problemSet) {
        iconNav.push("prob-set")
    }
    const breadcrumbs = buildBreadCrumbs({ course, chapter }, 3);

    let topMenu = (
        <TopMenu
            auth={auth}
            title={title}
            courseId={course.id}
            lessonId={lesson.id}
            chapterId={lesson.lesson_set_id}
            show={iconNav}
            breadcrumbs={breadcrumbs}
        />
    );
    let bottomMenu = (
        <BottomMenu
            prev={lessonIds.anterior}
            next={lessonIds.siguiente}
            probs={problemSet && problemSet.length > 0 ? lesson.id : null}
        />
    );

    return (
        <AuthenticatedLayout
            auth={auth}
            user={auth.user}
            header={false}
            topMenu={topMenu}
            bottomMenu={bottomMenu}
        >
            <Head title={title} />
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        {lessonSection}
                    </div>
                </div>
            </div>
            {videos.length > 0 &&
                <VideoComponent videos={videos} />
            }
        </AuthenticatedLayout>
    );
};

export default Index;
