import SvgIcon from "@mui/material/SvgIcon";


const ArrowIcon = ({ width = '10px', height = '10px', isLeft = false }: any) => {

  const style = isLeft ? { rotate: '180deg', marginRight: '10px' } : { rotate: '0deg', marginLeft: '10px' };

  return (
    <>
      <SvgIcon sx={{ height, width }}>
        <svg x="0px" y="0px" viewBox="0 0 24 24" strokeWidth={1.5} height={height} width={width} style={style}>
          <g fill="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="currentColor"
              d="M7,23.414L5.586,22l10-10l-10-10L7,0.586l10.707,10.707c0.391,0.391,0.391,1.023,0,1.414L7,23.414z"
            >
            </path>
          </g>
        </svg>
      </SvgIcon>
    </>
  );
}
export default ArrowIcon;