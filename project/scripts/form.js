// Product array
const products = [
    { id: 1, name: "Widget A" },
    { id: 2, name: "Gadget B" },
    { id: 3, name: "Tool C" },
    { id: 4, name: "Device D" }
];

// Populate the product select
document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('product');
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        select.appendChild(option);
    });

    // Handle rating stars
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    const ratingLabels = document.querySelectorAll('.rating label');

    ratingInputs.forEach((input, index) => {
        input.addEventListener('change', function() {
            ratingLabels.forEach((label, i) => {
                if (i < index + 1) {
                    label.style.color = '#ffc107';
                } else {
                    label.style.color = '#ddd';
                }
            });
        });
    });
});