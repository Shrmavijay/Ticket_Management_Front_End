export const stringAvatar = (name: string) => {
    console.log("Avatar name: ",name)
    const initials = name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  
    const colors = [
      // '#f44336', // Red
      // '#e91e63', // Pink
      // '#9c27b0', // Purple
      // '#673ab7', // Deep Purple
      // '#3f51b5', // Indigo
      // '#2196f3', // Blue
      // '#03a9f4', // Light Blue
      // '#00bcd4', // Cyan
      // '#009688', // Teal
      // '#4caf50', // Green
      // '#8bc34a', // Light Green
      // '#cddc39', // Lime
      // '#ffeb3b', // Yellow
      // '#ffc107', // Amber
      // '#ff9800', // Orange
      // '#ff5722', // Deep Orange
      '#795548', // Brown
      // '#9e9e9e', // Grey
      // '#607d8b', // Blue Grey
    ];
  
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
    return {
      style: { backgroundColor: randomColor },
      children: initials,
    };
  };
  