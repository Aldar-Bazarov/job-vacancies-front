export const EducationIcon: React.FC<{ size?: number }> = ({ size }) => {
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
          d="M4.5 24V13.5H7.5V24H4.5ZM13.5 24V13.5H16.5V24H13.5ZM0 30V27H30V30H0ZM22.5 24V13.5H25.5V24H22.5ZM0 10.5V7.5L15 0L30 7.5V10.5H0ZM6.675 7.5H23.325L15 3.375L6.675 7.5Z"
          fill="#D9D9D9"
        />
      </svg>
    </div>
  );
};

EducationIcon.defaultProps = { size: 20 };
