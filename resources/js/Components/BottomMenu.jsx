import { Link } from "@inertiajs/react";

// probably want refactor so that common elts are components, such as next btn, then an array of up to 3 btns is passed in here
export default function BottomMenu({prev = null, next = null, probs, nextWhat = 'lesson.show'}) {
    return (
        <div className="flex justify-between w-full my-2">
            
            <div className="">
                {prev != null &&
                    <Link as="button" href={route(nextWhat, {id: prev})} disabled={!prev}>
                        anterior
                    </Link>
                }
            </div>
            {probs != null &&
                <div className="">
                    <Link href={route('problemset.start', {id: probs})}>
                        problemas
                    </Link>
                </div>
            }
            <div className="">
                {next != null &&
                    <Link as="button" href={route(nextWhat, {id: next})} disabled={!next}>
                        siguiente
                    </Link>
                }
            </div>
        </div>
    );
}
