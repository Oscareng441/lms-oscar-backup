import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TopMenu from '@/Components/TopMenu';
import SourceForm from '@/Components/SourceForm';

export default function Edit(props) {
    const title = 'Fuente ' + props.source.id ? props.source.name : 'Nueva'

    let topMenu = (
        <TopMenu auth={ props.auth } title={ title } show={['home']} />
    )
    return (
        <AuthenticatedLayout auth={ props.auth } user={ props.auth.user } header={ false } topMenu={ topMenu }>
            <SourceForm source={ props.source } />
        </AuthenticatedLayout>
    )
}
