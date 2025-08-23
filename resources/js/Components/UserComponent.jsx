import { Link } from '@inertiajs/react';

export default function UserComponent(props) {
    return (
        <div className="my-1" >
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="bg-white shadow sm:rounded-lg sm:p-1">
                    <div className="flex">
                        <div className="mx-1 ">
                            { props.user.name }
                        </div>
                        <div className="mx-1 ">
                            { props.user.email }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
