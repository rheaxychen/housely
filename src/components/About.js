// About widget component
import React, {Component} from 'react';

export default class About extends Component {
    render() {
      return (
        <section className="sections-container">
            <div id="content" className="main-sections">
                <h1>About Us</h1>
                <p>
                    The idea for Full House was born from our collective frustration with the current state of communication between
                    landlords and tenants. While some apartment complexes have software that manages rent payment, most rented
                    houses do not. Moreover, the existing solution do not address other issues such as messaging with the landlord,
                    broken appliance tasks, as well as clear utility and rent breakdowns for the tenants.
                </p>
                <p>
                    We strongly believe that our solution empowers tenants to be more aware and involved in the process of renting a
                    house. It allows for transparency and a mutual understanding of the current state of affairs. Traditionally,
                    landlords prefer communication with one individual in a house regarding all issues. The problem with this is
                    that it leaves other tenants in the dark and places an unnecessary burden on one individual to manage the entire
                    house. Particularly for students, this can be a real challenege that leads to misunderstandings and
                    frustrations.
                </p>
                <p>
                    Our platform offers a simple solution to manage communication as well as general house management such as chore
                    lists. We believe this platform will improve the renting experience for all parties involved.
                </p>
                <h2 id="mission">
                    Mission
                </h2>
                <p>We seek to empower individuals and provide seemless utility for all. We strongly believe that when communication
                    is clear and streamlined, everyone benefits and thrives. We want to do all the heavy lifting so you don't have
                    to. We believe design is just as important as implementation and, as such, we are also looking to product a
                    product that is intuitive and works for everyone. We constantly are improving and value feedback from our
                    customers.</p>
                <h2 id="payment">
                    Our Payment Model
                </h2>
                <p>
                    A subscription model allows us to keep our service running reliably. Landlords are responsible for paying the
                    $10 a month subscription. As one of the main beneficiaries of such a service, we strongly encourage landlord's
                    to cover this cost, however, other arrangements with tenants is possible. This subscription would cover the
                    following benefits:
                </p>
                <ul>
                    <li>Secure, end-to-end encrypted messaging</li>
                    <li>Secure payment system</li>
                    <li>Live integration with utility companies to provide and simple and easy to use interface for paying bills
                    </li>
                    <li>Reminders</li>
                    <li>24/7 customer support</li>
                </ul>
            </div>
          </section>
      );
    }
  }