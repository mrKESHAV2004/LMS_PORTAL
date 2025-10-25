import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      className="loading-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at center, #eef2ff 0%, #c7d2fe 100%)"
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        style={{
          width: 80,
          height: 80,
          border: "6px solid #4f46e5",
          borderTop: "6px solid transparent",
          borderRadius: "50%"
        }}
        whileHover={{ scale: 1.2, rotate: 720 }}
      />
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          marginTop: 20,
          color: "#4f46e5",
          fontWeight: 600,
          fontSize: "1.2rem"
        }}
      >
        Loading...
      </motion.p>
    </motion.div>
  );
};

export default Loading;
