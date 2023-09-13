function colourChange() {
    let root = document.documentElement;
    let styles = getComputedStyle(root);

    let primaryColor = styles.getPropertyValue('--primaryColour').trim();
    let secondaryColor = styles.getPropertyValue('--secondaryColour').trim();
    let textColor = styles.getPropertyValue('--textColour').trim();

    root.style.setProperty('--primaryColour', secondaryColor);
    root.style.setProperty('--secondaryColour', primaryColor);
    root.style.setProperty('--textColour', textColor);
};