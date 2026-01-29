package com.billsummarizer.backend.dto;

import lombok.Data;

@Data
public class InvoiceSummaryResponse {
    private String billed_to;
    private String total_amount;
    private String due_date;
    private String services_summary;
}
