import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const WebsiteDetails = () => {
    const location = useLocation();
    const [websiteData, setWebsiteData] = useState(null);
  
    useEffect(() => {
      if (location.state && location.state.result) {
        const result = location.state.result;
        const whois = result.external_checks.whois_moredetails || {};
    
        const mappedData = {
          domain: result.url || "Unknown",
          domainAge: result.external_checks.domain_age_days ?? "N/A",
          registrar: whois.registrar || "Unknown",
          organization: whois.organization || "Unknown",
          country: whois.country || "Unknown",
          emails: Array.isArray(whois.emails) ? whois.emails : [],
          nameServers: Array.isArray(whois.name_servers) ? whois.name_servers : [],
          expirationDates: convertDatesToLocal(whois.expiration_date),
          updatedDates: convertDatesToLocal(whois.updated_date),
        };
    
        setWebsiteData(mappedData);
      } else {
        console.error("No result data passed!");
        setWebsiteData({ error: true }); // mark error
      }
    }, [location]);
  
  
  const convertDatesToLocal = (dates) => {
    if (!dates) return [];
    if (!Array.isArray(dates)) dates = [dates];
  
    return dates.map(dateItem => {
      try {
        if (typeof dateItem === "object" && dateItem.hasOwnProperty('year')) {
          // Handle if backend is sending datetime serialized as object
          const { year, month, day, hour = 0, minute = 0, second = 0 } = dateItem;
          return new Date(year, month - 1, day, hour, minute, second).toLocaleString();
        }
  
        if (typeof dateItem === "string") {
          // Clean raw strings like "datetime.datetime(2028, 9, 14, 4, 0)"
          if (dateItem.includes('datetime')) {
            const extracted = dateItem.match(/\d+/g);
            if (extracted && extracted.length >= 3) {
              const [year, month, day, hour = 0, minute = 0, second = 0] = extracted.map(Number);
              return new Date(year, month - 1, day, hour, minute, second).toLocaleString();
            }
          }
          // Otherwise, normal ISO string
          return new Date(dateItem).toLocaleString();
        }
  
        if (typeof dateItem === "number") {
          // Timestamps
          return new Date(dateItem).toLocaleString();
        }
  
        return String(dateItem); // fallback
      } catch (error) {
        console.error("Error converting date:", dateItem, error);
        return String(dateItem);
      }
    });
  };
  
  

  if (!websiteData) return <div style={styles.loading}>Loading...</div>;

  const renderList = (items) => {
    if (!items) return <li>Not Available</li>;
    if (Array.isArray(items)) {
      return items.map((item, idx) => (
        <li key={idx} style={styles.listItem}>{item.toString()}</li>
      ));
    } else {
      return <li style={styles.listItem}>{items.toString()}</li>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={styles.container}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        style={styles.card}
      >
        <h2 style={styles.heading}>🌐 Website Details</h2>

        <div style={styles.detailsContainer}>
          <div style={styles.grid}>
            <InfoCard title="Domain" value={websiteData.domain} />
            <InfoCard title="Domain Age" value={`${websiteData.domainAge} days`} />
            <InfoCard title="Registrar" value={websiteData.registrar} />
            <InfoCard title="Organization" value={websiteData.organization} />
            <InfoCard title="Country" value={websiteData.country} />
          </div>

          <Section title="📧 Associated Emails">
            <ul style={styles.list}>{renderList(websiteData.emails)}</ul>
          </Section>

          <Section title="🖥️ Name Servers">
            <ul style={styles.list}>{renderList(websiteData.nameServers)}</ul>
          </Section>

          <Section title="📅 Expiration Dates">
            <ul style={styles.list}>{renderList(websiteData.expirationDates)}</ul>
          </Section>

          <Section title="🔄 Updated Dates">
            <ul style={styles.list}>{renderList(websiteData.updatedDates)}</ul>
          </Section>
        </div>
      </motion.div>
    </motion.div>
  );
};

const InfoCard = ({ title, value }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    style={styles.infoCard}
  >
    <h4 style={styles.infoTitle}>{title}</h4>
    <p style={styles.infoValue}>{value}</p>
  </motion.div>
);

const Section = ({ title, children }) => (
  <div style={styles.section}>
    <h3 style={styles.sectionTitle}>{title}</h3>
    {children}
  </div>
);

const styles = {
  loading: {
    fontSize: '24px',
    textAlign: 'center',
    marginTop: '50px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #ebf4ff, #c3baf5)',
  },
  card: {
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
    padding: '2rem',
    width: '100%',
    maxWidth: '1000px',
  },
  heading: {
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#5a67d8',
  },
  detailsContainer: {
    fontSize: '18px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  infoCard: {
    padding: '1.5rem',
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  infoTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#5a67d8',
    marginBottom: '0.5rem',
  },
  infoValue: {
    fontSize: '16px',
    color: '#2d3748',
  },
  section: {
    padding: '1.5rem',
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.05)',
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#5a67d8',
  },
  list: {
    paddingLeft: '1.5rem',
  },
  listItem: {
    color: '#4a5568',
    marginBottom: '0.5rem',
  },
};

export default WebsiteDetails;
