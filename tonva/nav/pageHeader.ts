export interface PageHeaderPropsCore<E> {
    back?: 'back' | 'close' | 'none';
    center: string | E;
    right?: E;
    logout?: boolean | (()=>Promise<void>);
    className?: string;
	afterBack?: () => void;
	ex?: E;
}
