export const SkillsIcon: React.FC<{ size?: number }> = ({ size }) => {
  return (
    <div style={{ height: size, width: size }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 35 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.4317 30C26.1968 30 25.9618 29.9706 25.7269 29.9119C25.4919 29.8532 25.2717 29.7504 25.0661 29.6035L19.7797 26.5198C19.3686 26.2849 19.0529 25.9692 18.8326 25.5727C18.6123 25.1762 18.5022 24.743 18.5022 24.2731V18.0617C18.5022 17.5918 18.6123 17.1586 18.8326 16.7621C19.0529 16.3656 19.3686 16.0499 19.7797 15.815L25.0661 12.7313C25.2717 12.5844 25.4919 12.4816 25.7269 12.4229C25.9618 12.3642 26.1968 12.3348 26.4317 12.3348C26.6667 12.3348 26.8943 12.3715 27.1145 12.4449C27.3348 12.5184 27.5477 12.6138 27.7533 12.7313L33.0396 15.815C33.4508 16.0499 33.7739 16.3656 34.0088 16.7621C34.2438 17.1586 34.3612 17.5918 34.3612 18.0617V24.2731C34.3612 24.743 34.2438 25.1762 34.0088 25.5727C33.7739 25.9692 33.4508 26.2849 33.0396 26.5198L27.7533 29.6035C27.5477 29.721 27.3348 29.8164 27.1145 29.8899C26.8943 29.9633 26.6667 30 26.4317 30ZM14.0969 14.0969C12.1586 14.0969 10.4993 13.4068 9.11894 12.0264C7.73862 10.6461 7.04846 8.98678 7.04846 7.04846C7.04846 5.11013 7.73862 3.45081 9.11894 2.07048C10.4993 0.690161 12.1586 0 14.0969 0C16.0352 0 17.6946 0.690161 19.0749 2.07048C20.4552 3.45081 21.1454 5.11013 21.1454 7.04846C21.1454 8.98678 20.4552 10.6461 19.0749 12.0264C17.6946 13.4068 16.0352 14.0969 14.0969 14.0969ZM0 28.1938V23.2599C0 22.2907 0.249633 21.3803 0.748899 20.5286C1.24816 19.6769 1.93833 19.0308 2.81938 18.5903C4.31718 17.8267 6.00587 17.1806 7.88546 16.652C9.76505 16.1233 11.8355 15.859 14.0969 15.859H14.7137C14.8899 15.859 15.0661 15.8884 15.2423 15.9471C15.0073 16.4758 14.8091 17.0264 14.6476 17.5991C14.486 18.1718 14.3612 18.7665 14.2731 19.3833H14.0969C12.0117 19.3833 10.1395 19.6476 8.48018 20.1762C6.82085 20.7048 5.46255 21.2335 4.40529 21.7621C4.14097 21.909 3.92805 22.1145 3.76652 22.3789C3.60499 22.6432 3.52423 22.9369 3.52423 23.2599V24.6696H14.6256C14.8018 25.2863 15.0367 25.8957 15.3304 26.4978C15.6241 27.0999 15.9471 27.6652 16.2996 28.1938H0ZM14.0969 10.5727C15.0661 10.5727 15.8957 10.2276 16.5859 9.53744C17.2761 8.84728 17.6211 8.01762 17.6211 7.04846C17.6211 6.07929 17.2761 5.24963 16.5859 4.55947C15.8957 3.86931 15.0661 3.52423 14.0969 3.52423C13.1278 3.52423 12.2981 3.86931 11.6079 4.55947C10.9178 5.24963 10.5727 6.07929 10.5727 7.04846C10.5727 8.01762 10.9178 8.84728 11.6079 9.53744C12.2981 10.2276 13.1278 10.5727 14.0969 10.5727ZM22.2907 17.3568L26.4317 19.7797L30.5727 17.3568L26.4317 14.978L22.2907 17.3568ZM27.7533 26.5198L31.7181 24.2291V19.3833L27.7533 21.7181V26.5198ZM21.1454 24.2291L25.1101 26.5639V21.7621L21.1454 19.4273V24.2291Z"
          fill="#D9D9D9"
        />
      </svg>
    </div>
  );
};

SkillsIcon.defaultProps = { size: 20 };
