import { useEffect } from "react";

export const useShowDroppedSubsections = ( categoryGrade ) => {
    useEffect(() => {
        // Show badge if category has drop_count and grades
        if(categoryGrade.drop_count > 0 && categoryGrade.grade_percent != '0%'){
            var subsections = [...categoryGrade.detail]; // Copy array without reference
    
            subsections.sort((a, b) => (a.total_earned / a.total_possible) - (b.total_earned / b.total_possible) );  // Sort asc
            subsections = subsections.slice(0, categoryGrade.drop_count); // Filter the count of dropped subsections. Keep lowest grades
    
            subsections.forEach((subsection) => {
                document.getElementById(`badge_${subsection.url}`).classList.remove("d-none"); // Show 'dropped' badge
            });
        }

    }, [ categoryGrade ]);
}