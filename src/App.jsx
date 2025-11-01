/** 
 * Phonebook Challenge 
 * Theme: Yellow Book Directory
 * Desc: vintage Yellow Book theme. aiming for retro vibes
 * 
 * h1 - Yellow Book Directory
 * h2 - Like the ones in the movie
 * h3 - names and contact info 
 */

import { useEffect, useMemo, useState } from "react";
import "./App.css";

const FALLBACK_CONTACTS = [
    {
        id: 1,
        name: "Joe's Pizza",
        phone: "(212) 366-1182",
        email: "joespizzanyc@gmail.com",
        photo:"🍕",
        category: "Restaurant"
    },
    {
        id: 2,
        name: "Super Mario Bros. Plumbing",
        phone: "(929) 556-2746",
        email: "mariobros@nintendo.com",
        photo:"🔧",
        category:"Home Services"
    },
    {
        id: 3,
        name: "Dominican Hair Salon",
        phone: "(929) 010-0103",
        email: "dominicanhairsalon@gmail.com",
        photo:"💇🏽‍♀️",
        category:"Personal Care"
    },
    {
        id: 4,
        name: "Astoria Auto Repair",
        phone: "(917) 212-5555",
        email: "astoriacar@gmail.com",
        photo: "🚗",
        category: "Auto"
    },
    {
        id: 5,
        name: "Central Perk Cafe",
        phone: "(212) 555-2368",
        email: "centrelperk@gmail.com",
        photo: "☕️",
        category: "Restaurant"
    },
    {
        id: 6,
        name: "Dr. Smith's Dental",
        phone: "(516) 545-2786",
        email: "smithdental@gmail.com",
        photo: "🦷",
        category: "Medical"
    },
    {
        id: 7,
        name: "Ace Hardware Store",
        phone: "(212) 516-3478",
        email: "acehardware@gmail.com",
        photo: "🛠️",
        category: "Retail"
    },
    {
        id: 8,
        name: "Stacies Pet Grooming",
        phone: "(212) 675-8273",
        email: "staciesgrooming@gmail.com",
        photo: "🐶",
        category: "Pet Services"
    },
    {
        id: 9,
        name: "Happy Dry Cleaner",
        phone: "(212) 351-8164",
        email: "happycleaners@gmail.com",
        photo: "👕",
        category: "Services"
    },
    {
        id: 10,
        name: "Chase Bank",
        phone: "(212) 645-0896",
        email: "jpmorgan@gmail.com",
        photo: "🏦",
        category: "Financial"
    }
];

const App = () => {
    const [contacts, setContacts] = useState(FALLBACK_CONTACTS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {}, []);

    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [form, setForm] = useState({ name: "", phone: "", email: "" });

    const filteredContacts = useMemo(() => {
        if (!query) return contacts;

        const searchTerm = query.toLowerCase();
        return contacts.filter(
            (contact) =>
                contact.name.toLowerCase().includes(searchTerm) ||
                contact.phone.includes(searchTerm)
        );
    }, [contacts, query]);

    const currentContact = filteredContacts[currentPage];
    const totalPages = filteredContacts.length;
    const hasPrevious = currentPage > 0;
    const hasNext = currentPage < totalPages - 1;

     useEffect(() => {
        setCurrentPage(0);
    }, [query, contacts]);

    function handlePrevious() {
        if (hasPrevious) {
            setCurrentPage((prev) => prev - 1);
        }
    }

    function handleNext() {
        if (hasNext) {
            setCurrentPage((prev) => prev + 1);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Add contact submission logic here
    }

    return (
        <main className="page" data-testid="page-root">
            <header className="page__header">
                <h1 className="page__title">Yellow Book Directory</h1>
                <p className="page__subtitle">Like the ones in the movie</p>
            </header>

            <section className="search" aria-labelledby="search-heading">
                <h2 id="search-heading">Find Business</h2>
                <div className="search__controls">
                    <label htmlFor="search-input">Search</label>
                    <input
                        id="search-input"
                        type="search"
                        placeholder="Search by business name or phone number"
                        aria-label="Search business directory by name or phone number"
                        /** plug to result counts */
                        aria-describedby="search-results"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        data-testid="search-input"
                    />
                </div>

                <p 
                    id="search-results"
                    className="search__results"
                    data-testid="results-count"
                    role="status"
                    aria-live="polite"
                 > 
                 {filteredContacts.length > 0 ? (
                    <> 
                        Showing page {currentPage + 1} of {totalPages}
                        ({filteredContacts.length} total {filteredContacts.length == 1 ? "result": "results"})
                    </>
                ) : (
                    "No results found."
                )}
                {loading ? " (loading...)" : ""}
                {error ? ` (error: ${error})` : ""}
                </p>
            </section>

            <section className="contacts" aria-labelledby="contacts-heading">
                <h2 id="contacts-heading">Business Listings</h2>

                {/* for when no contacts match search */}
                {contacts.length === 0 ? (
                    <p className="contacts__empty">
                        No businesses found. Try a different search.
                    </p>
                ) : (
                    /* loop through contact array */
                    <ul className="contacts__grid" role="list">
                        {contacts.map((contact) => (
                            /* one card for each contact */
                            /* id for aria connection */
                            /* href for clickability, arial label for context*/
                            <li
                                key={contact.id}
                                className="contact-card"
                                role = "article"
                                aria-label={"contact-name: ${contact.name}"}
                            >
                                <div
                                className="contact-card__icon"
                                aria-hidden="true"
                                role="img"
                                aria-label={`${contact.category} icon`}
                                >
                                    {contact.photo}
                            </div>

                            <span className="contact-card__category">
                                {contact.category}
                            </span>

                            <h3 
                                id={`contact-name-${contact.id}`}
                                className="contact-card__name"
                            >
                                {contact.name}
                            </h3>

                            <p className="contact-card__phone">
                                <a
                                    href={`tel:${contact.phone}`}
                                    aria-label={`Call ${contact.name} at ${contact.phone}`}
                                >
                                    📞 {contact.phone}
                                </a>
                            </p>

                            <p className="contact-card__email">
                                <a
                                    href={`mailto:${contact.email}`}
                                    aria-label={`Email ${contact.name} at ${contact.email}`}
                                >
                                    📧 {contact.email}
                                </a>
                            </p>
                        </li>
                    ))}
                </ul>
                )}            
            </section>

            <section className="form" aria-labelledby="form-heading">
                <h2 id="form-heading">Add a Business</h2>
                <form className="form__body" onSubmit={handleSubmit} noValidate>
                    <div className="field">
                        <label htmlFor="name">
                            Business Name <span aria-label="required">*</span>
                            </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder = "Joe's Pizza"
                            aria-required="true"
                            aria-describedby="name-hint"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })}
                            required
                            minLength={2}
                        />
                        <span id="name-hint" className="field__hint">
                            Minimum 2 characters
                        </span>

                    </div>
                    <div className="field">
                        <label htmlFor="phone">
                            Phone Number <span aria-label="required">*</span>
                            </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            inputMode="tel"
                            placeholder="(555) 555-5555"
                            aria-required="true"
                            aria-describedby="phone-hint"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                            required
                        />
                        <span id="phone-hint" className="field__hint">
                            Format: (555) 555-5555
                        </span>

                    </div>
                    <div className="field">
                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="contact@business.com"
                            aria-describedby="email-hint"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                        <span id="email-hint" className="field__hint">
                            Must include @ symbol
                        </span>

                    </div>
                    <div className="form__actions">
                        <button 
                            className="btn"
                            type="submit"
                            data-testid="btn-add"
                            aria-label="Add business to directory"
                            >   
                            Add Listing
                        </button>
                    </div>
                </form>
            </section>

            <footer className="page__footer">
                <small>
                    Yellow Book Directory * A vintage contact directory app * Established in the Gen Z's prime @ 2025 * NYC
                </small>
            </footer>
        </main>
    );
};

export default App;
