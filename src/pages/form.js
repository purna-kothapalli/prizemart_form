import React, { useState, useEffect } from 'react';
import './styles.css'
import logo from './finpages_logo.jpeg'
// Define the initial state for all your form fields
const initialState = {
    restaurant_name: "",
    location: "",
    contact_person: "",
    contact_number: "", // 👈 Only listed once
    restaurant_type: [],
    restaurant_type_other: "",
    use_online: "no",
    platforms: [],
    platforms_other: "",
    purchase_frequency: "",
    categories: [],
    categories_other: "",
    experience_rating: "",
    factors: [],
    budget: "",
    order_advance: "",
    delivery_slot: "",
    recurring: "no",
    tech_comfort: "",
    payment: [],
    improvements: "",
    shift_all: "no",
    comments: ""
};

function QuestionnaireForm({ onSubmit }) {
    const [formData, setFormData] = useState(initialState);
    const [dropdownOpen, setDropdownOpen] = useState("");
    const [formCount, setFormCount] = useState(0);

    // A single, powerful change handler for all input types
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            // Handle checkbox groups (which are arrays in our state)
            setFormData(prevData => ({
                ...prevData,
                [name]: checked
                    ? [...prevData[name], value] // Add value to array
                    : prevData[name].filter(item => item !== value) // Remove value from array
            }));
        } else {
            // Handle all other inputs (text, radio, select)
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Stop the form from reloading the page
        onSubmit(formData); // Pass the final form data up to App.js
    };
    useEffect(() => {
  fetch("https://dev-api.dream60.com/priceMart/count")
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setFormCount(data.formCount);
      }
    })
    .catch(err => console.error("Count fetch error:", err));
}, []);


    return (        

        <div className="form-container">
<div className="count-box">
  Forms Submitted: <strong>{formCount}</strong>
</div>
            {/* Form Header with Logo and Company Name */}
            <div className="form-header">
                {/* IMPORTANT: 
          1. Place your logo in the `public` folder (e.g., `public/your-logo.png`)
          2. Then you can access it just with the path "/your-logo.png"
        */}
                <img src={logo} alt="Your Company Logo" className="logo" />
                <h2 className="company-name">FINPAGES TECH PVT LTD</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <h1>E-Commerce Grocery Questionnaire for Restaurants</h1>

                {/* Section 1: Basic Information */}
                <h2>Section 1: Basic Information</h2>
                <div className="form-group">
                    <label htmlFor="restaurant-name">1. Name of the restaurant</label>
                    <input type="text" id="restaurant-name" name="restaurant_name" value={formData.restaurant_name} onChange={handleChange} placeholder="Enter restaurant name" required />
                </div>

                <div className="form-group">
                    <label htmlFor="location">2. Location</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="Enter location (e.g., city, area)" required />
                </div>

                <div className="form-group">
                    <label htmlFor="contact-person">3. Contact person and designation</label>
                    <input type="text" id="contact-person" name="contact_person" value={formData.contact_person} onChange={handleChange} placeholder="e.g., John Doe - Purchase Manager" required />
                </div>
                <div className="form-group">
                    <label htmlFor="contact-number">4. Contact Number</label>
                    <input
                        type="tel"
                        id="contact-number"
                        name="contact_number"
                        value={formData.contact_number}
                        onChange={handleChange}
                        placeholder="Enter 10-digit mobile number"
                        required
                    />
                </div>
                <div className="form-group">
                    {/* I made the label plural, e.g., "type(s)" */}
                    <label>5. What type(s) of restaurant do you operate?</label>
                    <div className="choice-group">

                        {/* Changed type="radio" to type="checkbox" */}
                        {/* Changed checked logic to use .includes() for an array */}

                        <label><input type="checkbox" name="restaurant_type" value="fine_dining" checked={formData.restaurant_type.includes('fine_dining')} onChange={handleChange} /> Fine dining</label>
                        <label><input type="checkbox" name="restaurant_type" value="casual_dining" checked={formData.restaurant_type.includes('casual_dining')} onChange={handleChange} /> Casual dining</label>
                        <label><input type="checkbox" name="restaurant_type" value="cafe" checked={formData.restaurant_type.includes('cafe')} onChange={handleChange} /> Café</label>
                        <label><input type="checkbox" name="restaurant_type" value="cloud_kitchen" checked={formData.restaurant_type.includes('cloud_kitchen')} onChange={handleChange} /> Cloud kitchen</label>
                        <label><input type="checkbox" name="restaurant_type" value="qsr" checked={formData.restaurant_type.includes('qsr')} onChange={handleChange} /> QSR</label>
                        <label className="other-input">
                            <input type="checkbox" name="restaurant_type" value="other" checked={formData.restaurant_type.includes('other')} onChange={handleChange} /> Other

                            {/* Updated the disabled logic to also use .includes() */}
                            <input type="text" name="restaurant_type_other" value={formData.restaurant_type_other} onChange={handleChange} placeholder="Please specify" disabled={!formData.restaurant_type.includes('other')} />
                        </label>
                    </div>
                </div>

                {/* Section 2: Current Procurement Process */}
                <h2>Section 2: Current Procurement Process</h2>
                <div className="form-group">
                    <label>6. Do you currently use any online grocery/e-commerce platforms?</label>
                    <div className="choice-group horizontal">
                        <label><input type="radio" name="use_online" value="yes" checked={formData.use_online === 'yes'} onChange={handleChange} /> Yes</label>
                        <label><input type="radio" name="use_online" value="no" checked={formData.use_online === 'no'} onChange={handleChange} /> No</label>
                    </div>
                </div>

                {/* This entire block for Question 6 will ONLY appear
          if the user has selected "yes" above.
        */}
                {formData.use_online === "yes" && (
                    <div className="form-group">
                        <label>7. Which platforms do you use?</label>

                        <div className="dropdown-wrapper">
                            <div className="dropdown-header" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                Select Platforms
                                <span className="arrow">{dropdownOpen ? "▲" : "▼"}</span>
                            </div>

                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    {[
                                        "metro",
                                        "dmart",
                                        "flipkart",
                                        "amazon",
                                        "zepto",
                                        "instamart",
                                    ].map((platform) => (
                                        <label key={platform} className="dropdown-option">
                                            <input
                                                type="checkbox"
                                                name="platforms"
                                                value={platform}
                                                checked={formData.platforms.includes(platform)}
                                                onChange={handleChange}
                                            />
                                            {platform.toUpperCase()}
                                        </label>
                                    ))}

                                    {/* Other option */}
                                    <label className="dropdown-option other-input">
                                        <input
                                            type="checkbox"
                                            name="platforms"
                                            value="other"
                                            checked={formData.platforms.includes("other")}
                                            onChange={handleChange}
                                        />
                                        Other
                                    </label>

                                    {formData.platforms.includes("other") && (
                                        <input
                                            type="text"
                                            name="platforms_other"
                                            placeholder="Please specify"
                                            value={formData.platforms_other}
                                            onChange={handleChange}
                                            className="other-text"
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}


                <div className="form-group">
                    <label>8. How often do you purchase groceries?</label>
                    <div className="choice-group">
                        <label><input type="radio" name="purchase_frequency" value="daily" checked={formData.purchase_frequency === 'daily'} onChange={handleChange} /> Daily</label>
                        <label><input type="radio" name="purchase_frequency" value="weekly" checked={formData.purchase_frequency === 'weekly'} onChange={handleChange} /> Weekly</label>
                        <label><input type="radio" name="purchase_frequency" value="bi-weekly" checked={formData.purchase_frequency === 'bi-weekly'} onChange={handleChange} /> Bi-weekly</label>
                        <label><input type="radio" name="purchase_frequency" value="monthly" checked={formData.purchase_frequency === 'monthly'} onChange={handleChange} /> Monthly</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>9. What are your most frequently purchased categories online?</label>
                    <div className="choice-group">
                        <label><input type="checkbox" name="categories" value="produce" checked={formData.categories.includes('produce')} onChange={handleChange} /> Fresh produce</label>
                        <label><input type="checkbox" name="categories" value="dairy" checked={formData.categories.includes('dairy')} onChange={handleChange} /> Dairy</label>
                        <label><input type="checkbox" name="categories" value="meat" checked={formData.categories.includes('meat')} onChange={handleChange} /> Meat & poultry</label>
                        <label><input type="checkbox" name="categories" value="staples" checked={formData.categories.includes('staples')} onChange={handleChange} /> Staples</label>
                        <label><input type="checkbox" name="categories" value="beverages" checked={formData.categories.includes('beverages')} onChange={handleChange} /> Beverages</label>
                        <label><input type="checkbox" name="categories" value="cleaning" checked={formData.categories.includes('cleaning')} onChange={handleChange} /> Cleaning supplies</label>
                        <label className="other-input">
                            <input type="checkbox" name="categories" value="other" checked={formData.categories.includes('other')} onChange={handleChange} /> Other
                            <input type="text" name="categories_other" value={formData.categories_other} onChange={handleChange} placeholder="Please specify" disabled={!formData.categories.includes('other')} />
                        </label>
                    </div>
                </div>

                {/* Section 3: Awareness & Usage */}
                <h2>Section 3: Awareness & Usage</h2>
                <div className="form-group">
                    <label htmlFor="experience-rating">10. Rate your overall experience with existing online platforms (1-10)</label>
                    <select id="experience-rating" name="experience_rating" value={formData.experience_rating} onChange={handleChange}>
                        <option value="" disabled>Select a rating</option>
                        {[...Array(10).keys()].map(n => (
                            <option key={n + 1} value={n + 1}>{n + 1}</option>
                        ))}
                    </select>
                </div>

                {/* Section 4: Requirements & Expectations */}
                <h2>Section 4: Requirements & Expectations</h2>
                <div className="form-group">
                    <label>11. What are the most important factors when choosing a supplier?</label>
                    <div className="choice-group">
                        <label><input type="checkbox" name="factors" value="quality" checked={formData.factors.includes('quality')} onChange={handleChange} /> Product quality</label>
                        <label><input type="checkbox" name="factors" value="price" checked={formData.factors.includes('price')} onChange={handleChange} /> Price competitiveness</label>
                        <label><input type="checkbox" name="factors" value="speed" checked={formData.factors.includes('speed')} onChange={handleChange} /> Delivery speed</label>
                        <label><input type="checkbox" name="factors" value="bulk" checked={formData.factors.includes('bulk')} onChange={handleChange} /> Availability of bulk quantities</label>
                        <label><input type="checkbox" name="factors" value="reliability" checked={formData.factors.includes('reliability')} onChange={handleChange} /> Reliability of delivery</label>
                        <label><input type="checkbox" name="factors" value="support" checked={formData.factors.includes('support')} onChange={handleChange} /> Customer support</label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="budget">12. What is your monthly grocery budget?</label>
                    <input type="text" id="budget" name="budget" value={formData.budget} onChange={handleChange} placeholder="e.g., $5,000 or ₹4,00,000" />
                </div>

                {/* Section 5: Ordering & Delivery Preferences */}
                <h2>Section 5: Ordering & Delivery Preferences</h2>
                <div className="form-group">
                    <label htmlFor="order-advance">13. How far in advance do you prefer to place orders?</label>

                    {/* Replaced the <input> with this <select> dropdown */}
                    <select id="order-advance" name="order_advance" value={formData.order_advance} onChange={handleChange}>
                        <option value="" disabled>Select an option</option>
                        <option value="Same day">Same day</option>
                        <option value="1 day before">1 day before</option>
                    </select>

                </div>

                <div className="form-group">
                    <label>14. Preferred delivery time slots:</label>
                    <div className="choice-group">
                        <label><input type="radio" name="delivery_slot" value="morning" checked={formData.delivery_slot === 'morning'} onChange={handleChange} /> Early morning</label>
                        <label><input type="radio" name="delivery_slot" value="midday" checked={formData.delivery_slot === 'midday'} onChange={handleChange} /> Midday</label>
                        <label><input type="radio" name="delivery_slot" value="evening" checked={formData.delivery_slot === 'evening'} onChange={handleChange} /> Evening</label>
                        <label><input type="radio" name="delivery_slot" value="flexible" checked={formData.delivery_slot === 'flexible'} onChange={handleChange} /> Flexible</label>
                    </div>
                </div>

                <div className="form-group">
                    <label>15. Do you require scheduled recurring deliveries?</label>
                    <div className="choice-group horizontal">
                        <label><input type="radio" name="recurring" value="yes" checked={formData.recurring === 'yes'} onChange={handleChange} /> Yes</label>
                        <label><input type="radio" name="recurring" value="no" checked={formData.recurring === 'no'} onChange={handleChange} /> No</label>
                    </div>
                </div>

                {/* Section 6: Technology & Payment */}
                <h2>Section 6: Technology & Payment</h2>
                <div className="form-group">
                    <label htmlFor="tech-comfort">16. How comfortable are you with ordering via apps/websites? (1-5)</label>
                    <select id="tech-comfort" name="tech_comfort" value={formData.tech_comfort} onChange={handleChange}>
                        <option value="" disabled>Select a rating</option>
                        <option value="1">1 (Not comfortable)</option>
                        <option value="2">2</option>
                        <option value="3">3 (Neutral)</option>
                        <option value="4">4</option>
                        <option value="5">5 (Very comfortable)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>17. Preferred payment methods</label>
                    <div className="choice-group">
                        <label><input type="checkbox" name="payment" value="cod" checked={formData.payment.includes('cod')} onChange={handleChange} /> Cash on Delivery (COD)</label>
                        <label><input type="checkbox" name="payment" value="online" checked={formData.payment.includes('online')} onChange={handleChange} /> Online payment</label>
                        <label><input type="checkbox" name="payment" value="credit_7" checked={formData.payment.includes('credit_7')} onChange={handleChange} /> Credit (7 days)</label>
                        <label><input type="checkbox" name="payment" value="credit_15" checked={formData.payment.includes('credit_15')} onChange={handleChange} /> Credit (15 days)</label>
                    </div>
                </div>

                {/* Section 7: Pain Points & Expectations */}
                <h2>Section 7: Pain Points & Expectations</h2>
                <div className="form-group">
                    <label htmlFor="improvements">18. What improvements or features would you like in a new platform?</label>
                    <textarea id="improvements" name="improvements" rows="4" value={formData.improvements} onChange={handleChange} placeholder="Describe any pain points or desired features..."></textarea>
                </div>

                {/* Section 8: Final Feedback */}
                <h2>Section 8: Final Feedback</h2>
                <div className="form-group">
                    <label>19. Would you be willing to shift your entire grocery procurement to a reliable e-commerce platform?</label>
                    <div className="choice-group horizontal">
                        <label><input type="radio" name="shift_all" value="yes" checked={formData.shift_all === 'yes'} onChange={handleChange} /> Yes</label>
                        <label><input type="radio" name="shift_all" value="no" checked={formData.shift_all === 'no'} onChange={handleChange} /> No</label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="comments">20. Additional comments or suggestions:</label>
                    <textarea id="comments" name="comments" rows="4" value={formData.comments} onChange={handleChange} placeholder="Any final thoughts..."></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-btn">Submit Questionnaire</button>

            </form>
        </div>
    );
}

export default QuestionnaireForm;