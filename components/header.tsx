import { ShoppingBasketIcon } from "lucide-react"

import { AccountMenu } from "./account-menu"
import { Separator } from "./ui/separator"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center gap-6 px-6">
                <ShoppingBasketIcon className="h-6 w-6" />
                Lista de Compras

                <div className="ml-auto flex items-center space-x-2">
                    <ThemeToggle />
                    <AccountMenu />
                </div>
            </div>
        </div>
    )
}