import { Building, ChevronDown, LogOut } from 'lucide-react'

import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'

import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
    const isSigningOut = false;

    const isLoadingProfile = false;

    const isLoadingManagedRestaurant = false;

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex select-none items-center gap-2"
                    >
                        {isLoadingManagedRestaurant ? (
                            <Skeleton className="h-4 w-40" />
                        ) : (
                            "Eduardo Vieira"
                        )}
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col">
                        {isLoadingProfile ? (
                            <div className="space-y-1.5">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        ) : (
                            <>
                                Eduardo Vieira
                                <span className="text-xs font-normal text-muted-foreground">
                                    eduardo@example.com
                                </span>
                            </>
                        )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DialogTrigger asChild>
                            <DropdownMenuItem>
                                <Building className="mr-2 h-4 w-4" />
                                <span>Configurações</span>
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuItem
                            asChild
                            className="text-rose-500 dark:text-rose-400"
                            disabled={isSigningOut}
                        >
                            <button className="w-full">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Sair</span>
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

        </Dialog>
    )
}