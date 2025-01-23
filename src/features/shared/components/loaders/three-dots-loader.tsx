import { ThreeDots } from "react-loader-spinner";

export const ThreeDotsLoader = ({ wrapperClass }: { wrapperClass?: string }) => {
	return (
		<ThreeDots
			visible={true}
			height="40"
			width="40"
			color="#FF764C"
			ariaLabel="three-dots-loading"
			wrapperClass={wrapperClass}
		/>
	);
};
