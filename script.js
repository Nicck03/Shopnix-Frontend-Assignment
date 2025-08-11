$(document).ready(function() {

    // Global variable to keep track of the current step
    let currentStep = 1;

    // Show the first step on page load
    $('#step' + currentStep).addClass('active');

    // Function to show a message box
    function showMessage(message, type = 'danger', duration = 3000) {
        const messageBox = $('#message-box');
        const messageText = $('#message-text');
        
        messageBox.removeClass('bg-danger bg-success bg-warning').addClass(`bg-${type}`);
        messageText.text(message);
        messageBox.fadeIn().delay(duration).fadeOut();
    }

    // Handle "Next" button clicks
    $(document).on('click', '#next1, #next2, #next3', function() {
        // Validation logic for each step
        switch (currentStep) {
            case 1:
                // No validation needed for step 1, just a simple transition
                currentStep = 2;
                break;
            case 2:
                // Check if product type is entered
                if ($('#product-type').val().trim() === '') {
                    showMessage('Please enter a product type to continue.');
                    return;
                }
                currentStep = 3;
                break;
            case 3:
                // Simple validation for product name and net price
                if ($('#product-name').val().trim() === '' || $('#net-price').val().trim() === '') {
                    showMessage('Please fill in the product name and net price.');
                    return;
                }
                // On final submit, you'd typically send the data to a server
                showMessage('Onboarding complete! Submitting data...', 'success', 5000);
                return;
        }

        // Hide current step and show the next one
        $('.step').removeClass('active');
        $('#step' + currentStep).addClass('active');

        // Scroll to top of the page on step change
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });

    // Handle "Back" button clicks
    $(document).on('click', '#back2, #back3', function() {
        currentStep--;
        $('.step').removeClass('active');
        $('#step' + currentStep).addClass('active');
    });

    // Handle theme card selection in Step 1
    $('.theme-card').on('click', function() {
        $('.theme-card').removeClass('selected');
        $(this).addClass('selected');

        // Update the "Apply" button states
        $('.theme-card .apply-btn').removeClass('btn-primary').addClass('btn-outline-primary');
        $(this).find('.apply-btn').removeClass('btn-outline-primary').addClass('btn-primary');
    });

    // Toggle SKU input field based on checkbox
    $('#has-sku').on('change', function() {
        if ($(this).is(':checked')) {
            $('#sku-input-container').slideDown();
        } else {
            $('#sku-input-container').slideUp();
        }
    });

    // Real-time product preview in Step 3
    $('#product-name').on('input', function() {
        const productName = $(this).val() || 'Product title';
        $('#preview-title').text(productName);
    });

    $('#product-description').on('input', function() {
        const productDescription = $(this).val() || 'Esse minim eiusmod amet et incididunt magna consectetur laborum. Ipsum et cillum do exercitation nostrud nostrud ex. Consectetur Lorem nostrud sint adipisicing amet ipsum cupidatat Lorem adipisicing veniam officia duis excepteur Lorem labore. Non eu non.';
        $('#preview-description').text(productDescription);
    });

    $('#net-price').on('input', function() {
        const netPrice = $(this).val() || '90';
        $('#preview-price-net').text(netPrice);
    });

    $('#list-price').on('input', function() {
        const listPrice = $(this).val() || '100';
        $('#preview-price-list').text(listPrice);
    });
});