export const AboutCompanyIcon: React.FC<{ size?: number }> = ({ size }) => {
  return (
    <div style={{ height: size, width: size }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 30V5.625L7.5 0L15 5.625V9H30V30H0ZM3 27H6V24H3V27ZM3 21H6V18H3V21ZM3 15H6V12H3V15ZM3 9H6V6H3V9ZM9 9H12V6H9V9ZM9 27H27V12H9V27ZM18 18V15H24V18H18ZM18 24V21H24V24H18ZM12 18V15H15V18H12ZM12 24V21H15V24H12Z"
          fill="#D9D9D9"
        />
      </svg>
    </div>
  );
};

AboutCompanyIcon.defaultProps = { size: 20 };
