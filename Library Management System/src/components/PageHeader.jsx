import { colors } from "../styles/theme.js";

const PageHeader = ({ title, subtitle, icon = "📚" }) => {
    return (
        <div
            style={{
                background: "#F5EFE7",
                borderRadius: "24px",
                padding: "32px",
                marginBottom: "32px",
                border: `1px solid ${colors.border}`,
                boxShadow: "0 4px 12px rgba(120, 85, 60, 0.08)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "24px",
                    flexWrap: "wrap",
                }}
            >
                {/* LEFT SECTION */}
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "8px",
                        }}
                    >
                        <span style={{ fontSize: "34px" }}>
                            {icon}
                        </span>

                        <h1
                            style={{
                                margin: 0,
                                fontSize: "34px",
                                fontWeight: "700",
                                color: colors.primary,
                            }}
                        >
                            {title}
                        </h1>
                    </div>

                    <p
                        style={{
                            margin: 0,
                            color: colors.textLight,
                            fontSize: "15px",
                        }}
                    >
                        {subtitle}
                    </p>
                </div>

                {/* RIGHT SECTION (optional slot like search/actions) */}
                <div style={{ flexShrink: 0 }}>
                    {/* You can pass buttons/search later here if needed */}
                </div>
            </div>
        </div>
    );
};

export default PageHeader;