import type { ReactNode } from 'react'
import { router } from '@inertiajs/react'
import { useState, useEffect } from 'react'

import {
  HomeIcon,
  UserIcon,
  LogOutIcon,
  UsersIcon,
  Languages,
} from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import authService from '@/lib/auth'

type Props = {
  trigger: ReactNode
  user: {
    name: string
    email: string
    avatar_url?: string | null
    admin?: boolean
  }
  defaultOpen?: boolean
  align?: 'start' | 'center' | 'end'
}

const ProfileDropdown = ({ trigger, user, defaultOpen, align = 'end' }: Props) => {
  const [currentLang, setCurrentLang] = useState<'en' | 'ru'>('en')

  useEffect(() => {
    const lang = localStorage.getItem('interface_language') as 'en' | 'ru' | null
    if (lang) {
      setCurrentLang(lang)
    }
  }, [])

  const handleLogout = async () => {
    await authService.logout()
    router.visit('/', { replace: true })
  }

  const switchLanguage = (lang: 'en' | 'ru') => {
    localStorage.setItem('interface_language', lang)
    setCurrentLang(lang)
    window.location.reload()
  }

  const getUserInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const initials = getUserInitials(user.name)

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className='w-80' align={align || 'end'}>
        <DropdownMenuLabel className='flex items-center gap-4 px-4 py-2.5 font-normal'>
          <Avatar className='size-10'>
            <AvatarImage src={user.avatar_url || undefined} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className='flex flex-1 flex-col items-start'>
            <span className='text-foreground text-lg font-semibold'>{user.name}</span>
            <span className='text-muted-foreground text-base'>{user.email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {!user.admin && (
            <DropdownMenuItem className='px-4 py-2.5 text-base' onClick={() => router.visit('/learning/dashboard')}>
              <HomeIcon className='text-foreground size-5' />
              <span>Dashboard</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className='px-4 py-2.5 text-base' onClick={() => router.visit('/profile')}>
            <UserIcon className='text-foreground size-5' />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className='px-4 py-2.5 text-base'>
              <Languages className='text-foreground size-5' />
              <span>Language</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => switchLanguage('en')}>
                <span className='mr-2'>🇬🇧</span>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchLanguage('ru')}>
                <span className='mr-2'>🇷🇺</span>
                Русский
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          {user.admin && (
            <DropdownMenuItem className='px-4 py-2.5 text-base' onClick={() => router.visit('/admin/console')}>
              <UsersIcon className='text-foreground size-5' />
              <span>Admin Console</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant='destructive' className='px-4 py-2.5 text-base' onClick={handleLogout}>
          <LogOutIcon className='size-5' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown
