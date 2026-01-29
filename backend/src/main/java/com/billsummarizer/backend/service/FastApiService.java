package com.billsummarizer.backend.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.billsummarizer.backend.dto.InvoiceSummaryResponse;

@Service
public class FastApiService {

    @Value("${fastapi.base-url}")
    private String fastApiUrl;

    @Autowired
    private RestTemplate restTemplate;

    public InvoiceSummaryResponse summarizeText(String extractedText) {
        try {
            String url = fastApiUrl + "/summarize-text";

            String normalizedText = extractedText;
            if (normalizedText != null) {
                normalizedText = normalizedText.trim();
                if (normalizedText.startsWith("\"") && normalizedText.endsWith("\"")) {
                    normalizedText = normalizedText.substring(1, normalizedText.length() - 1);
                }
                normalizedText = normalizedText.replace("\\n", "\n");
            }

            System.out.println("Sending request to: " + url);
            System.out.println("Text length: " + (normalizedText == null ? 0 : normalizedText.length()));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> body = new HashMap<>();
            body.put("text", normalizedText);

            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<InvoiceSummaryResponse> response =
                    restTemplate.postForEntity(
                            url,
                            request,
                            InvoiceSummaryResponse.class
                    );

            System.out.println("Response received: " + response.getStatusCode());
            return response.getBody();
        } catch (Exception e) {
            System.err.println("Error calling FastAPI: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to call FastAPI service: " + e.getMessage(), e);
        }
    }
}


