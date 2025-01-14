package org.example.fastandfoodybackend.Service;

import org.example.fastandfoodybackend.DTO.ItemDTO;
import org.example.fastandfoodybackend.Model.Item;
import org.example.fastandfoodybackend.Repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    @Autowired
    private ItemRepository itemRepository;

    //convert item list to item dto list
    public List<ItemDTO> itemListToItemDTO(List<Item> itemList) {
        return itemList.stream().map(i -> {
            ItemDTO itemDTO = new ItemDTO(i.getId(), i.getItemName(), i.getPrice(),
                    i.getDescription(), i.getImage(), i.getCategory().getCategoryName());
            return itemDTO;
        }).toList();
    }

    public List<ItemDTO> items() {
        return itemListToItemDTO(itemRepository.findAll());
    }
}