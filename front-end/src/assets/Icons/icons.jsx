import React from 'react';
import { FaBeer, FaHome, FaUser, FaCamera, FaEdit, FaAngleLeft, FaAngleRight } from 'react-icons/fa';  // Import your icons here
import { IoPersonAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

// Mapping icons to their respective components
const iconMap = {
    beer: FaBeer,
    home: FaHome,
    user: FaUser,
    camera: FaCamera,
    add: IoPersonAdd,
    update: FaEdit,
    delete: MdDelete,
    pageLeft: FaAngleLeft,
    pageRight: FaAngleRight
};

const Icon = ({ name, className = '' }) => {
    // Find the matching icon based on the name prop
    const Icon = iconMap[name] || null;

    if (!Icon) {
        return null;
    }

    return (
        // Add the className prop to allow users to use TailwindCSS classes
        <Icon className={className} />
    );
};

export default Icon;
