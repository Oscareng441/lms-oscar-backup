import { Link } from "@inertiajs/react";

export default function VideoComponent({videos}) {
    return (
        <div className="mx-auto w-full  sm:max-w-7xl space-y-6 video-component">
            <div className="video-component-title">
                Videos
            </div>
            <div className="video-component-list sm:ml-12">
                {
                    videos.map(v => {
                        return (
                            <div>
                                <a href={v.url} target="_blank">{v.name}</a>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
