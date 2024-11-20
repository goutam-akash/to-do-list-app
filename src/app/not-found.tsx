/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

const Custom404: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontSize: "3rem", color: "#FF6B6B" }}>
        404 - Page Not Found
      </h1>
      <p style={{ fontSize: "1.5rem", color: "#333" }}>
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link href="/" legacyBehavior>
        <a
          style={{
            fontSize: "1.2rem",
            color: "#0070f3",
            textDecoration: "underline",
          }}
        >
          Go back to Home
        </a>
      </Link>
    </div>
  );
};

export default Custom404;

