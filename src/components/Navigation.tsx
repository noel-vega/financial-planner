import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Receipt } from "lucide-react";

export function Navigation() {
	return (
		<nav className="border-b mb-8">
			<div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 max-w-6xl">
				<div className="flex items-center justify-between mb-6">
					<div className="min-w-0">
						<h1 className="text-3xl sm:text-5xl font-bold mb-2">
							Vega Family Planner
						</h1>
						<p className="text-sm sm:text-lg text-muted-foreground">
							Your comprehensive financial planning dashboard
						</p>
					</div>
				</div>
				<div className="flex gap-3 sm:gap-6 overflow-x-auto">
					<Link
						to="/overview"
						className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-md transition-colors hover:bg-muted [&.active]:bg-muted [&.active]:font-semibold whitespace-nowrap"
					>
						<LayoutDashboard className="h-4 w-4" />
						<span className="text-sm sm:text-base">Overview</span>
					</Link>
					<Link
						to="/expenses"
						className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-md transition-colors hover:bg-muted [&.active]:bg-muted [&.active]:font-semibold whitespace-nowrap"
					>
						<Receipt className="h-4 w-4" />
						<span className="text-sm sm:text-base">Expenses</span>
					</Link>
				</div>
			</div>
		</nav>
	);
}
