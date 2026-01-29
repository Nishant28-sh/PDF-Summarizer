package com.billsummarizer.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.billsummarizer.backend.dto.InvoiceSummaryRequest;
import com.billsummarizer.backend.dto.InvoiceSummaryResponse;
import com.billsummarizer.backend.service.FastApiService;

@RestController
@RequestMapping("/api/invoice")
@CrossOrigin
public class InvoiceController {

    @Autowired
    private FastApiService fastApiService;

    @PostMapping("/summarize")
    public InvoiceSummaryResponse summarizeInvoice(
            @RequestBody InvoiceSummaryRequest request
    ) {
        return fastApiService.summarizeText(request.getText());
    }
}
