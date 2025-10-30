type LoadingAppProps = {
	title?: string;
};

export const LoadingApp = ({ title }: LoadingAppProps) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-black/50">
			<div className="flex flex-col items-center gap-4">
				<div className="relative h-16 w-16" role="status" aria-live="polite">
					<span className="sr-only">Cargando…</span>
					<div className="h-full w-full rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-indigo-500 dark:border-t-indigo-400 animate-spin" />
				</div>
				{title ? (
					<p className="text-sm font-medium text-gray-700 dark:text-gray-200">{title}</p>
				) : null}
			</div>
		</div>
	);
};