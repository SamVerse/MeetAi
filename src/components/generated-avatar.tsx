import { createAvatar} from '@dicebear/core';
import { bottts, botttsNeutral, initials , } from '@dicebear/collection';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface GeneratedAvatarProps {
    seed: string;
    classname?: string;
    variant?: 'bottts' | 'initials' | 'botttsNeutral';
}

export const GeneratedAvatar = ({seed, classname , variant}: GeneratedAvatarProps) => {
    let avatar;
    if (variant === 'bottts') {
        avatar = createAvatar(bottts, {
            seed
        });
    } else if (variant === 'botttsNeutral') {
        avatar = createAvatar(botttsNeutral, {
            seed,
        });
    } else {
        avatar = createAvatar(initials, {
            seed,
            fontWeight: 500,
            fontSize: 42,
        });
    }

    return (
        <Avatar className={cn(classname)}>
            <AvatarImage src={avatar.toDataUri()} alt="Avatar" />
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    );
}

