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
        name: "Ada Lovelace",
        phone: "(555) 010-0101",
        email: "ada@example.com",
    },
    {
        id: 2,
        name: "Alan Turing",
        phone: "(555) 010-0102",
        email: "alan@example.com",
    },
    {
        id: 3,
        name: "Grace Hopper",
        phone: "(555) 010-0103",
        email: "grace@example.com",
    },
];

const App = () => {
    const [contacts, setContacts] = useState(FALLBACK_CONTACTS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {}, []);

    const [query, setQuery] = useState("");

    const [form, setForm] = useState({ name: "", phone: "", email: "" });
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

                <p /** className="search__results" data-testid="results-count"> comment in case of oopsies */
                   id = "search-results"
                   className="search__results"
                   data-testid="results-count"
                   role="status"
                   aria-live="polite" /** announce changes */
                 > 
                    Showing {contacts.length}{" "}
                    {contacts.length === 1 ? "result" : "results"}
                    {loading ? " (loading...)" : ""}
                    {error ? ` (error: ${error})` : ""}
                </p>
            </section>

            <section className="contacts" aria-labelledby="contacts-heading">
                <h2 id="contacts-heading">Businesses</h2>
                <ul className="contacts__grid" role="list">
                </ul>   
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
