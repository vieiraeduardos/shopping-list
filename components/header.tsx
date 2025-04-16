import { ShoppingCart } from "lucide-react"

import { AccountMenu } from "./account-menu"
import { Separator } from "./ui/separator"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center gap-6 px-6">
                <ShoppingCart className="h-6 w-6" />
                Shopping List

                <Separator orientation="vertical" className="h-6" />

                <div className="ml-auto flex items-center space-x-2">
                    <ThemeToggle />
                    <AccountMenu />
                </div>
            </div>
        </div>
    )
}