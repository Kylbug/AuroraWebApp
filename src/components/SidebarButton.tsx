import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCog, faUser } from '@fortawesome/free-solid-svg-icons';

interface SidebarButtonProps {
    text: string;
    icon: IconDefinition;
}

export default function SidebarButton(props: SidebarButtonProps) {
    return (
        <div class="btn btn-ghost flex items-center">
            <FontAwesomeIcon icon={props.icon} class="mr-2" />
            {props.text}
        </div>
    );
}
