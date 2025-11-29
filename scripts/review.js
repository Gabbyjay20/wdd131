// Display review details and update counter
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);

    // Get product name from id
    const productId = urlParams.get('product');
    const products = [
        { id: '1', name: "Widget A" },
        { id: '2', name: "Gadget B" },
        { id: '3', name: "Tool C" },
        { id: '4', name: "Device D" }
    ];
    const product = products.find(p => p.id === productId);
    document.getElementById('product').textContent = product ? product.name : 'Unknown';

    // Rating
    const rating = urlParams.get('rating');
    document.getElementById('rating').textContent = '★'.repeat(rating) + '☆'.repeat(5 - rating);

    // Install date
    document.getElementById('installDate').textContent = urlParams.get('installDate') || 'Not provided';

    // Features
    const features = urlParams.getAll('features');
    document.getElementById('features').textContent = features.length ? features.join(', ') : 'None selected';

    // Review
    document.getElementById('review').textContent = urlParams.get('review') || 'No review provided';

    // User name
    document.getElementById('userName').textContent = urlParams.get('userName') || 'Anonymous';

    // Counter
    let count = parseInt(localStorage.getItem('reviewCount')) || 0;
    count++;
    localStorage.setItem('reviewCount', count);
    document.getElementById('reviewCount').textContent = count;
});