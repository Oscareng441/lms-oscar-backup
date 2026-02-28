import { Link } from "@inertiajs/react";

export default function BottomMenu({prev = null, next = null, probs, unitId}) {
    return (
        <div className="flex justify-between w-full my-2">
            
            <div className="">
                {prev != null &&
                    <Link as="button" href={route('lesson.show', {id: prev})} disabled={!prev}>
                        anterior
                    </Link>
                }
            </div>
            {probs != null &&
                <div className="">
                    <Link href={route('problemset.student', {id: probs})}>
                        problemas
                    </Link>
                </div>
            }
            <div className="">
                {next != null &&
                    <Link as="button" href={route('lesson.show', {id: next})} disabled={!next}>
                        siguiente
                    </Link>
                }
            </div>
        </div>
    );
}
